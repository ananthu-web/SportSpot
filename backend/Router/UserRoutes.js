import express from "express";
import { updatePassword, updateProfile } from "../Controller/AuthController.js";
import { authMiddleware } from "../Middleware/auth.js";
import { creatBooking } from "../Controller/Order.js";
import { getAvailableSlots, getUserBookings } from "../Controller/Bookings.js";

const router = express.Router();

router.put("/update-profile", authMiddleware, updateProfile);
router.put("/update-password",authMiddleware,updatePassword)
router.post("/booking",authMiddleware,creatBooking)
router.get("/userbookings/:userId",authMiddleware,getUserBookings)
router.get("/availableslots",authMiddleware,getAvailableSlots)


export default router;