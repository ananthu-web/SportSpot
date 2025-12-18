import express from "express";
import { updatePassword, updateProfile } from "../Controller/AuthController.js";
import { authMiddleware } from "../Middleware/auth.js";
// import { createOrder } from "../Controller/PaymentController.js";
import { creatBooking } from "../Controller/Order.js";
import { getUserBookings } from "../Controller/Bookings.js";

const router = express.Router();

router.put("/update-profile", authMiddleware, updateProfile);
router.put("/update-password",authMiddleware,updatePassword)
// router.post("/create-order",authMiddleware,createOrder)
router.post("/booking",authMiddleware,creatBooking)
router.get("/userbookings/:userId",authMiddleware,getUserBookings)


export default router;