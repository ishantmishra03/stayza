import userModel from "../models/user.models.js"

export const protectedRoute = async (req,res,next) => {
    const {userId} = req.auth;
    if(!userId){
        return res.json({success: false, message : "Not Authenticated"});
    } else {
        const user = await userModel.findById(userId);
        req.user = user;
        next();
    }
}