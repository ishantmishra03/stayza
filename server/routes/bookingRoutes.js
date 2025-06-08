import express from 'express';
const bookingRouter = express.Router();
import { createBooking,checkAvailabilityAPI, getUserBookings, getHotelBookings, stripePayment  } from "../controllers/bookingController.js";
import { protectedRoute } from "../middlewares/auth.middleware.js"

bookingRouter.post('/book', protectedRoute, createBooking);
bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.get('/user', protectedRoute, getUserBookings);
bookingRouter.get('/hotel', protectedRoute, getHotelBookings);
bookingRouter.post('/stripe-payment', protectedRoute, stripePayment);

export default bookingRouter;