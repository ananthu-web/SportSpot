import Order from "../Models/Order.js"


export const creatBooking= async(req,res)=>{
    
    try{
        const booking = await Order.create(req.body)
        res.status(201).json({
            success:true,
            booking,
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            success:false,
            message:"booking creation failed"
        })
    }
}