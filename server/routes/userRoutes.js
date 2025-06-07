import express from 'express';
const userRouter = express.Router();
import { getUserData, storeRecentSearchedCities } from "../controllers/userController.js";
import { protectedRoute } from "../middlewares/auth.middleware.js"

userRouter.get('/', protectedRoute, getUserData);
userRouter.post('/store-recent-search', protectedRoute, storeRecentSearchedCities);

export default userRouter;