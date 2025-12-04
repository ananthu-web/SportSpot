import express from "express"
import Court from "../Models/Court.js"

 const router=express.Router()

router.get("/carddetails",async(req,res)=>{

    try{
        const courts= await Court.find().populate("owner")
        res.json(courts)
    }catch(err){
        res.status(500).json({err:"failed to fetch courts data"})
    }

})

export default router;