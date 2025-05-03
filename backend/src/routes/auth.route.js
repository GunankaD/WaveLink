// this is a route file
// here it routes each endpoint to a certain function

import express from "express"
import {protectRoute} from "../middleware/auth.middleware.js"
import {login, logout, signup, updateProfile, checkAuth} from "../controllers/auth.controller.js"

const router = express.Router();

// POST routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// PUT routes
// protectRoute is a middleware which first checks if the user is logged in
router.put("/update-profile", protectRoute, updateProfile);

// GET routes
router.get("/check", protectRoute, checkAuth)
export default router;