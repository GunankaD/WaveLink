import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config(); // loads all env variables into process.env

const app = express();

// .use() is used to register middleware or mount routes

// this should be added before any route handlers. required to parse req.body
app.use(express.json());

// allows us to parse the cookies to grab values out of it
app.use(cookieParser());

// route handler for authentication
app.use("/api/auth", authRoutes)

// route handler for messages
app.use("/api/message", messageRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("server is running on port: ",PORT)
    connectDB()
})