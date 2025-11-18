import Sport from "../Models/Sports.js";
import SportsData from"../Datas/SportsData.js";


export const seedSportsData = async () => {
  try {
    
    await Sport.deleteMany();
    console.log("Old data removed.");

    await Sport.insertMany(SportsData);
    console.log("Sports data inserted successfully!");

  } catch (error) {
    console.error("Seeding error:", error);
  }
};

