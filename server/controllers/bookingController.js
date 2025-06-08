import bookingModel from "../models/booking.models.js"
import hotelModel from "../models/hotel.models.js"
import roomModel from "../models/room.models.js"
import stripe from "stripe";

//Check Availability of room
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const bookings = await bookingModel.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate },
        })
        const isAvailable = bookings.length === 0;
        return isAvailable
    } catch (error) {
        console.log(error.message);
    }
}

//API to check availlability of room
export const checkAvailabilityAPI = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        const isAvailable = await checkAvailability({ room, checkInDate, checkOutDate });
        res.json({ success: true, isAvailable });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//API to create a new booking | /api/bookings |
export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;
        const user = req.user._id;

        const isAvailable = await checkAvailability({ room, checkInDate, checkOutDate });

        if (!isAvailable) return res.json({ success: false, message: "Room Not Available" });

        const roomData = await roomModel.findById(room).populate('hotel');
        let totalPrice = roomData.pricePerNight;

        const checkIn = new Date(checkInDate)
        const checkOut = new Date(checkOutDate)
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        totalPrice *= nights;

        await bookingModel.create({
            user,
            room,
            hotel: roomData.hotel._id,
            checkInDate,
            checkOutDate,
            totalPrice,
            guests: +guests,
        })

        return res.json({ success: true, message: "Room Booked Successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//API to get all bookings of a user
export const getUserBookings = async (req, res) => {
    try {
        const userId = req.auth?.userId;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const bookings = await bookingModel
            .find({ user: userId })
            .populate('room hotel')
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Get all bookings fro hotel dashboard
export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await hotelModel.findOne({ admin: req.auth.userId });
        if (!hotel) {
            return res.json({ success: false, message: "No Hotel found" });
        }
        const bookings = await bookingModel.find({ hotel: hotel._id }).populate('room hotel user').sort({ createdAt: -1 });
        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0)
        res.json({ success: true, totalBookings, totalRevenue, bookings });
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

//Stripe Payment
export const stripePayment = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await bookingModel.findById(bookingId);
        const roomData = await roomModel.findById(booking.room).populate('hotel');
        const totalPrice = booking.totalPrice;

        const { origin } = req.headers;

        const stripeInstance = new stripe(process.env.STRIPE_PRIVATE_KEY);

        const line_items = [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: roomData.hotel.name,
                    },
                    unit_amount: totalPrice * 100
                },
                quantity: 1,
            }
        ]

        //Create checkout session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            metadata: {
                bookingId
            }
        })

        res.json({ success: true, url: session.url })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}