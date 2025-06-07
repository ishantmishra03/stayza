import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    recentSearchedCities: [{ type: String, required: true }]
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);

export default userModel;