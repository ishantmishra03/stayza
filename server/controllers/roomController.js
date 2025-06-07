import hotelModel from "../models/hotel.models.js"
import roomModel from "../models/room.models.js"
import { v2 as cloudinary } from "cloudinary";

//Create a new room
export const createRoom = async (req, res) => {
    try {
        const { type, pricePerNight, amenities } = req.body;

        const userId = req.auth?.userId || req.user?._id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        // Find hotel by admin user ID
        const hotel = await hotelModel.findOne({ admin: userId });
        if (!hotel) {
            return res.status(404).json({ success: false, message: "No hotel found for this admin" });
        }

        // Ensure images are uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "Please upload at least one image" });
        }

        // Upload images to Cloudinary
        const uploadImages = req.files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url;
        });
        const images = await Promise.all(uploadImages);

        // Create new room
        const newRoom = await roomModel.create({
            hotel: hotel._id,
            type,
            pricePerNight,
            amenities: JSON.parse(amenities),
            images,
        });

        return res.status(201).json({ success: true, message: "Room created successfully", room: newRoom });
    } catch (error) {
        console.error("Error creating room:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

//Get All Rooms
export const getAllRooms = async (req, res) => {
    try {
        const rooms = await roomModel.find({ isAvailable: true }).populate({
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
        const hotelData = await hotelModel.findOne({ admin: req.auth.userId });
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