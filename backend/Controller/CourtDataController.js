import Court from "../Models/Court.js";
import { CourtsData } from "../Datas/CourtData.js";


export const seedCourtData = async () => {
  try {
    
    await Court.deleteMany();
    console.log("Old data removed.");

    await Court.insertMany(CourtsData);
    console.log("Courts data inserted successfully!");

  } catch (error) {
    console.error("Seeding error:", error);
  }
};