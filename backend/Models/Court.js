import mongoose from "mongoose";

const courtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sportType: { type: String, required: true }, // Basketball, Archery, Surfing, etc.
  location: { type: String, required: true },
  latitude: { type: Number, required: false },       // For map integration
  longitude: { type: Number, required: false },
  size: { type: String, required: true },           // Court dimensions
  playerCount: { type: Number, required: true },
  courtType: { type: String, required: true },      // Indoor/Outdoor, Surface type
  bookingCharge: { type: Number, required: false },
  lighting: { type: String, default: "Not available" }, // e.g., Floodlights
  photos: [{ type: String }],                       // Array of image URLs
  amenities: [{ type: String }],      
   map: { type: String, required: false },               // e.g., Changing rooms, Parking
  equipmentAvailable: [{ type: String }],           // Balls, nets, etc.
  slots: [
    {
      time: String,
      isBooked: { type: Boolean, default: false },
    },
  ],
  rating: { type: Number, default: 0 },
  reviews: [{ type: String }],
  owner: {
    name: { type: String },
    phone: { type: String },
    email: { type: String },
  },
  maxBookingHours: { type: Number, default: 2 },     // Max consecutive booking hours
});

export default mongoose.model("Court", courtSchema);