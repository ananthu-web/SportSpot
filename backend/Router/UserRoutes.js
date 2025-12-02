import express from "express";
import { updateProfile } from "../Controller/AuthController.js";
import { authMiddleware } from "../Middleware/auth.js";

const router = express.Router();

router.put("/update-profile", authMiddleware, updateProfile);

export default router;