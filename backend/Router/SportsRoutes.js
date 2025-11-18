import express, { json } from "express";
import Banner from "../Models/Banner.js";
import Sport from "../Models/Sports.js";

const router=express.Router()

router.get("/banner", async(req,res)=>{
    try{
        const banners=await Banner.find()
        res.json(banners)
    }catch(err){
        res.status(500).json({error:"failed to fetch banners"})

    }
})

router.get("/sports",async(req,res)=>{
    try{
        const sports = await Sport.find()
        res.json(sports)
    }catch(err){
        res.status(500).json({error:"failed to fetch available sports"})
    }

    
})


export default router 
