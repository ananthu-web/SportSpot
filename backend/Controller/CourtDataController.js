// import Court from "../Models/Court.js";
// import { CourtsData } from "../Datas/CourtData.js";


// export const seedCourtData = async () => {
//   try {
    
//     await Court.deleteMany();
//     console.log("Old data removed.");

//     await Court.insertMany(CourtsData);
//     console.log("Courts data inserted successfully!");

//   } catch (error) {
//     console.error("Seeding error:", error);
//   }
// };


import Court from "../Models/Court.js";
import { CourtsData } from "../Datas/CourtData.js";

export const seedCourtData = async () => {
  try {
    // Ensure 'name' is unique in the schema (add this in Court.js)
    // CourtSchema.index({ name: 1 }, { unique: true });

    const insertPromises = CourtsData.map(async (court) => {
      // Check if a court with the same name already exists
      const existing = await Court.findOne({ name: court.name });
      if (!existing) {
        await Court.create(court);
      }
    });

    await Promise.all(insertPromises);

    console.log("Courts data inserted successfully (duplicates skipped)!");
  } catch (error) {
    console.error("Seeding error:", error);
  }
};