import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import Dotenv  from "dotenv";
import authRoutes from "./Router/AuthRoutes.js"

Dotenv.config()

const app=express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

app.get("/",(req,res)=>{
    res.send("backend is running")
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
