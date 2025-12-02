import express from "express";
import { signup, login, updateProfile } from "../Controller/AuthController.js";
import { authMiddleware } from "../Middleware/auth.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);



export default router;