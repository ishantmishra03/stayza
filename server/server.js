import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebHooks from "./controllers/clerkWebHook.js";
import userRouter from "./routes/userRoutes.js"
import hotelRouter from './routes/hotelRoutes.js';
import roomRouter from "./routes/roomRoutes.js"
import connectCloudinary from "./config/cloudinary.js"


//Configurations
const app = express();
await connectDB();
connectCloudinary();

app.use(cors()); //CORS

//Middlewares
app.use(express.json());
app.use(clerkMiddleware());
app.use('/api/clerk', clerkWebHooks);
app.use('/api/user', userRouter);
app.use('/api/hotel', hotelRouter);
app.use('/api/room', roomRouter);

app.get('/', (req, res) => res.send("Working..."));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})