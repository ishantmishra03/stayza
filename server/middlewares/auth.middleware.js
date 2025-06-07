import userModel from "../models/user.models.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const { userId } = req.auth;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not Authenticated" });
    }
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
