import bookingModel from "../models/booking.models.js"
import hotelModel from "../models/hotel.models.js"

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

        if (!isAvailable) return res.json({ success: false, message: "Rpom Not Available" });

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
        const user = req.user._id;
        const bookings = await bookingModel.find({ user }).populate('room hotel').sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await hotelModel.find({ admin: req.auth.userId });
        if (!hotel) {
            return res.json({ success: false, message: "No Hotel found" });
        }
        const bookings = await bookingModel.find({ hotel: hotel._id }).populate('room hotel user').sort({ createdAt: -1 });
        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((acc,curr) => acc + curr.totalPrice, 0)
res.json({ success: true, totalBookings, totalRevenue, bookings });
    } catch (error) {
    return res.json({ success: false, message: error.message })
}
}