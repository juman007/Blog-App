import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoDB.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import connectCloudinary from "./config/cloudinary.js";

// app config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
   "https://buletin-frontend.vercel.app",
   "https://buletin-two.vercel.app",
];

const corsOptions = {
   origin: (origin, callback) => {
      // Allow requests from allowed origins or no origin (for non-browser tools like Postman)
      if (allowedOrigins.includes(origin) || !origin) {
         callback(null, true);
      } else {
         callback(new Error("Not allowed by CORS"));
      }
   },
   methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
   credentials: true, // Allow cookies and credentials
};

// Use CORS middleware
app.use(cors(corsOptions));

app.get("/", (req, res) => {
   res.send("Hello, world!");
});

// API
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

app.listen(PORT, (req, res) => {
   console.log(`http://localhost:${PORT}`);
});
