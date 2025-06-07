import hotelModel from "../models/hotel.models.js"
import roomModel from "../models/room.models.js"
import { v2 as cloudinary } from "cloudinary";

//Create a new room
export const createRoom = async (req, res) => {
    try {
        const { type, pricePerNight, amenities } = req.body;
        const hotel = await hotelModel.findOne({ admin: req.auth.userId });

        if (!hotel) return res.json({ success: false, message: "No Hotel found" });

        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path);
            return response.secure_url;
        });

        const images = await Promise.all(uploadImages);
        await roomModel.create({
            hotel: hotel._id,
            type,
            pricePerNight,
            amenities: JSON.parse(amenities),
            images,
        });

        return res.json({ success: true, message: "Room created successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//Get All Rooms
export const getAllRooms = async (req, res) => {
    try {
        const rooms = await roomModel.find({ isAvailable: true }).polulate({
            path: 'hotel',
            populate: {
                path: 'admin',
                select: 'image'
            }
        }).sort({ createdAt: -1 });
        return res.json({ success: true, rooms });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//All rooms for a specific hotel
export const getAdminRooms = async (req, res) => {
    try {
        const hotelData = await hotelModel.findById({ admin: req.user.userId });
        const rooms = await roomModel.find({ hotel: hotelData._id }).populate('hotel');

        return res.json({ success: true, rooms });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//Toggle availability of a room
export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body;
        const roomData = await roomModel.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.json({ success: true, message: "Room availability updated" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}