import BannerData from "../Datas/BannerData.js";
import Banner from "../Models/Banner.js";



export const seedBannerData=async ()=>{
    try{
        await Banner.deleteMany()
        console.log("Old data removed ");

        await Banner.insertMany(BannerData)
        console.log("Banner data inserted succesfully");

    }catch(error){
        console.error("Banner data seeding error:",error)
    }

}