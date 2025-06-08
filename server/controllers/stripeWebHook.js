import Stripe from "stripe";
import bookingModel from "../models/booking.models.js";

const stripeInstance = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export const stripeWebHooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_SIGNING_SECRET
    );
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    try {
      // Retrieve Checkout Sessions related to the PaymentIntent
      const sessions = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntent.id,
      });

      if (!sessions.data || sessions.data.length === 0) {
        console.warn("⚠️ No checkout session found for this payment intent.");
        return res.status(404).json({ error: "Checkout session not found" });
      }

      const session = sessions.data[0];
      const bookingId = session.metadata?.bookingId;

      if (!bookingId) {
        console.warn("⚠️ No bookingId in session metadata.");
        return res.status(400).json({ error: "Invalid metadata (bookingId missing)" });
      }

      // Update booking in DB
      await bookingModel.findByIdAndUpdate(bookingId, {
        isPaid: true,
        paymentMethod: "Stripe",
      });

      console.log(`✅ Booking ${bookingId} marked as paid.`);
      res.status(200).send({ success: true });
    } catch (err) {
      console.error("🔥 Error handling payment webhook:", err);
      res.status(500).json({ error: "Server error processing webhook" });
    }
  } else {
    console.log(`⚠️ Unhandled event type: ${event.type}`);
    res.status(200).send({ received: true });
  }
};
