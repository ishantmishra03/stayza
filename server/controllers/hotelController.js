import hotelModel from "../models/hotel.models.js"
import userModel from "../models/user.models.js"

export const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;
        const admin = req.user._id;

        const hotel = await hotelModel.findOne({ admin });
        if (hotel) {
            return res.json({ success: false, message: "Hotel already registered" });
        }

        await hotelModel.create({ name, address, contact, city, admin });
        await userModel.findByIdAndUpdate(admin, { role: "admin" });

        res.json({ success: true, message: "Hotel Registered Successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}