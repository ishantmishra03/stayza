import express from 'express';
const roomRouter = express.Router();
import { createRoom, getAllRooms, getAdminRooms, toggleRoomAvailability } from "../controllers/roomController.js";
import { protectedRoute } from "../middlewares/auth.middleware.js"
import upload from "../middlewares/upload.middleware.js"

roomRouter.post('/', upload.array("images", 4), protectedRoute, createRoom);
roomRouter.get('/', getAllRooms);
roomRouter.get('/admin', protectedRoute ,getAdminRooms);
roomRouter.post('/toggle-availability', protectedRoute ,toggleRoomAvailability);

export default roomRouter;