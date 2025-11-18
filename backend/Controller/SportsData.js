import Sport from "../Models/Sports.js";
import SportsData from"../Datas/SportsData.js";


export const seedData = async () => {
  try {
    
    await Sport.deleteMany();
    console.log("Old data removed.");

    await Sport.insertMany(SportsData);
    console.log("Sports data inserted successfully!");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

