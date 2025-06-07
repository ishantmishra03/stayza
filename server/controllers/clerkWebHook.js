import userModel from "../models/user.models.js";
import { Webhook } from "svix";

const clerkWebHooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.SIGNING_SECRET);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // Verify the webhook
        await whook.verify(JSON.stringify(req.body), headers);

        const { data, type } = req.body;

        // Basic validation
        if (!data.email_addresses?.[0]?.email_address) {
            throw new Error("Missing email address in webhook payload.");
        }

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: `${data.first_name} ${data.last_name}`,
            image: data.image_url,
        };

        switch (type) {
            case "user.created":
                await userModel.create(userData);
                break;
            case "user.updated":
                await userModel.findOneAndUpdate({ _id : data.id }, userData, { new: true });
                break;
            case "user.deleted":
                await userModel.findOneAndDelete({ _id: data.id });
                break;
            default:
                console.log("Unhandled webhook type:", type);
        }

        return res.json({ success: true, message: "Webhook received" });
    } catch (error) {
        console.error("Webhook error:", error);
        return res.status(400).json({ success: false, message: error.message });
    }
};

export default clerkWebHooks;
