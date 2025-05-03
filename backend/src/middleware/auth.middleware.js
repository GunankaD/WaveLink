import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// check if this current user has the token
// used by updateProfile()
export const protectRoute = async (req, res, next) => {
    try {
        // extract token from cookie
        const token = req.cookies.jwt

        // CHECK: if token exists
        if(!token){
            return res.status(401).json({message: "Unauthorized - No Token Provided"});
        }

        // CHECK: if this token is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({message: "Unauthorized - Invalid Token"});
        }

        // extract userId
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        req.user = user;

        // call the next function
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
        return res.status(500).json({error:"Internal Server Error"});
    }
}