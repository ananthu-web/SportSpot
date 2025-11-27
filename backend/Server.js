import express from "express";
import cors from "cors"
import Dotenv  from "dotenv";
import authRoutes from "./Router/AuthRoutes.js"
import { seedSportsData } from "./Controller/SportsDataControler.js";
import { connectDB } from "./DataBase.js";
import { seedBannerData } from "./Controller/BannerDataController.js";
import dataRoutes from "./Router/SportsRoutes.js"
import { seedCourtData } from "./Controller/CourtDataController.js";
import courtroutes  from "./Router/CourtRoutes.js"
import addcourtRoutes from "./Router/AddcourtRoutes.js"


Dotenv.config()

const app=express()

app.use(cors())
app.use(express.json())
app.use("/images", express.static("Public/Images"));


app.use("/api/auth", authRoutes);
app.use("/api/data",dataRoutes)
app.use("/api/courts",courtroutes)
app.use("/api/admin",addcourtRoutes)


app.get("/",(req,res)=>{
    res.send("backend is running")
})

const startServer = async () => {
  try {
    await connectDB();
    await seedBannerData()
    await seedSportsData(); 
    await seedCourtData() 

    const PORT = process.env.PORT;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Server startup error:", err);
  }
};

startServer();