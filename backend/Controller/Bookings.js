import Order from "../Models/Order.js";

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch all orders for this user and populate court details
    const orders = await Order.find({ userId }).populate("courtId").sort({ date: -1 });

    res.status(200).json(orders); // send raw orders
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};


// Get booked slots for a specific court on a specific date
export const getAvailableSlots = async (req, res) => {
  try {
    const { courtId, date } = req.query;

    if (!courtId || !date) {
      return res.status(400).json({
        success: false,
        message: "courtId and date are required",
      });
    }

    // Normalize date (start and end of day)
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Find orders for this court on this date that are paid
    const orders = await Order.find({
      courtId,
      date: { $gte: startOfDay, $lte: endOfDay },
      status: "paid",
    });

    // Collect all booked slots
    const bookedSlots = orders.flatMap((order) => order.slots);

    return res.status(200).json({
      success: true,
      bookedSlots, // e.g., ["1 to 2", "3 to 4"]
    });
    
    
  } catch (error) {
    console.error("Error fetching available slots:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};