import express from "express";
import { protectRoute } from "../middleware/auth.middleware";

import { getUsersForSidebar, getMessages, sendMessages } from "../controllers/message.controller";

const router = express.Router();

// GET 
router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

// POST
router.post("/send/:id", protectRoute, sendMessages);
export default router;