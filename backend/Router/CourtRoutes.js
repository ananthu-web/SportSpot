import express from "express";
import Court from "../Models/Court.js";
import Order from "../Models/Order.js";

const router = express.Router();

const normalizeSlot = (time) => {
  if (!time || typeof time !== "string") return "";

  // Remove extra spaces
  let t = time.trim();

  // Replace "to" or "-" with "-"
  t = t.replace(/\s*(to|-)\s*/i, "-");

  // Split start and end
  let [start, end] = t.split("-");
  if (!start || !end) return t.toLowerCase();

  // Ensure hours have leading zero and add ":00" if missing
  const formatHour = (h) => {
    h = h.trim();
    if (h.includes(":")) return h.padStart(5, "0"); // already HH:MM
    return h.padStart(2, "0") + ":00"; // add minutes
  };

  start = formatHour(start);
  end = formatHour(end);

  return `${start}-${end}`.toLowerCase();
};


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

        // const bookedSlots = orders.flatMap(order => order.slots);

        // return {
        //   ...court.toObject(),
        //   slots: court.slots.map(slot => ({
        //     time: slot,
        //     isBooked: bookedSlots.includes(slot),
        //   })),
        // };
        const bookedSlots = orders.flatMap((order) =>
          (order.slots || []).map((s) => normalizeSlot(s))
        );

        return {
          ...court.toObject(),
          slots: (court.slots || []).map((slot) => ({
            time: typeof slot === "string" ? slot : slot.time || "",
            isBooked: bookedSlots.includes(normalizeSlot(typeof slot === "string" ? slot : slot.time || "")),
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