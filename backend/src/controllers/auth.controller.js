import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"; // used to create user object from our schema

import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

// res.status(400) -> bad request
// res.status(500) -> internal server error
// res.status(200) -> request successful
// res.status(201) -> something new has been created

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // CHECK: all fields filled
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // CHECK: password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // CHECK: make sure this email doesnt already have an account
    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // CHECK: only if newUser is a proper object
    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // fetch the user from db
    const user = await User.findOne({ email });

    // CHECK: if user doesnt exist in the db
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // CHECK: if correct password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    // clear cookies
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    // req also includes .user because of protectRoute() middleware
    const userId = req.user._id;

    // CHECK: profilePic
    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    // upload profilePic to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    // store the cloudinaryUrl of the image in mongoDB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};