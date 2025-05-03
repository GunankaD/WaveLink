import mongoose from "mongoose"

// function that connects us to MongoDB
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI); // check.env files for the environment variables
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(error){
        console.log("MongoDB connection error:", error);
    }
}