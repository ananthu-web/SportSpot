import express from "express";
import Court from "../Models/Court.js";
import Order from "../Models/Order.js";

const router = express.Router();

router.get("/carddetails", async (req, res) => {
  try {
    const courts = await Court.find().populate("owner");

    const selectedDate = req.query.date
      ? new Date(req.query.date)
      : new Date();

    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const courtsWithBookings = await Promise.all(
      courts.map(async (court) => {
        const orders = await Order.find({
          courtId: court._id,
          date: { $gte: startOfDay, $lte: endOfDay },
          status: "paid",
        });

        const bookedSlots = orders.flatMap(order => order.slots);

        return {
          ...court.toObject(),
          slots: court.slots.map(slot => ({
            time: slot,
            isBooked: bookedSlots.includes(slot),
          })),
        };
      })
    );

    res.json(courtsWithBookings);
  } catch (err) {
    res.status(500).json({ err: "failed to fetch courts data" });
  }
});

export default router;