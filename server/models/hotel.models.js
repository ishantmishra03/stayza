import mongoose from 'mongoose';

const hotelSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    admin: { type: String, required: true, ref: 'user' },
    city: { type: String, required: true }
}, { timestamps: true });

const hotelModel = mongoose.model('hotel', hotelSchema);

export default hotelModel;