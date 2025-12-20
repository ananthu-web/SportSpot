import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Court",
      required: true,
    },
    courtType: { type: String, required: true },

    date: {
      type: Date,
      required: true,
    },
      bookingDate: { type: Date, default: Date.now }, // ✅ When the booking was made


    slots: {
      type: [String], // ["10:00", "11:00"]
      required: true,
    },

    durationPerSlot: {
      type: Number,
      default: 1, // hours
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentId: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["paid", "cancelled", "expired"],
      default: "paid",
    },

    duration: {
      type: Number, // total duration in hours
    },
    maxPlayers: {
      type: Number,
    },
    courtName: {
      type: String,
    },
    location: {
      type: String,
    },
    userName: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    userPhone: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    instructions: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", bookingSchema);