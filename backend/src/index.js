import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser"

dotenv.config()
const app = express();

// this should be added before any route handlers
app.use(express.json());

// allows us to parse the cookies to grab values out of it
app.use(cookieParser());

// route handler for authentication
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("server is running on port: "+PORT)
    connectDB()
})