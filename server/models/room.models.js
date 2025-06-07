import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
    hotel: { type: String, ref: 'hotel', required: true },
    type: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    amenities: { type: Array, required: true },
    images: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

const roomModel = mongoose.model('room', roomSchema);

export default roomModel;