import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // simplified
    console.log("mongoDb connected");
    

  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // stop server if DB fails
  }
};