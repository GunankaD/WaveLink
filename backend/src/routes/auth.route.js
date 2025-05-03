// this is a route file
// here it routes each endpoint to a certain function

import express from "express"
import {protectRoute} from "../middleware/auth.middleware.js"
import {login, logout, signup, updateProfile} from "../controllers/auth.controller.js"

const router = express.Router();

// post routes, ie router uses that when a POST request comes from the browser
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// protectRoute is a middleware which first checks if the user is logged in
router.put("/update-profile", protectRoute, updateProfile);

export default router;