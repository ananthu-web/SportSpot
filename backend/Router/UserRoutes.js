import express from "express";
import { updatePassword, updateProfile } from "../Controller/AuthController.js";
import { authMiddleware } from "../Middleware/auth.js";
import { createOrder } from "../Controller/PaymentController.js";

const router = express.Router();

router.put("/update-profile", authMiddleware, updateProfile);
router.put("/update-password",authMiddleware,updatePassword)
router.post("/create-order",authMiddleware,createOrder)

export default router;