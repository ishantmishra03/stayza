import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebHooks from "./controllers/clerkWebHook.js";
import userRouter from "./routes/userRoutes.js"
import hotelRouter from './routes/hotelRoutes.js';
import roomRouter from "./routes/roomRoutes.js"
import bookingRouter from "./routes/bookingRoutes.js"
import connectCloudinary from "./config/cloudinary.js"
import { stripeWebHooks } from "./controllers/stripeWebHook.js"


//Configurations
const app = express();
await connectDB();
await connectCloudinary();

const allowedOrigins = [
  "http://localhost:5173",
  "https://stayza.vercel.app", 
];

//API to listen Stripe Webhook
app.post('/api/stripe', express.raw({type: "application/json"}), stripeWebHooks)

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

//Middlewares
app.use(express.json());
app.use(clerkMiddleware());
app.use('/api/clerk', clerkWebHooks);
app.use('/api/user', userRouter);
app.use('/api/hotel', hotelRouter);
app.use('/api/room', roomRouter);
app.use('/api/bookings', bookingRouter);

app.get('/', (req, res) => res.send("Working..."));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})