import express from 'express';
const hotelRouter = express.Router();
import { registerHotel } from "../controllers/hotelController.js";
import { protectedRoute } from "../middlewares/auth.middleware.js"

hotelRouter.post('/', protectedRoute, registerHotel);

export default hotelRouter;