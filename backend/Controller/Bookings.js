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