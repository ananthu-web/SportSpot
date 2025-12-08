import Court from "../Models/Court.js";


export const getmycourts=async(req,res)=>{

    try{
        const adminId = req.user._id; // from authMiddleware
    const courts = await Court.find({ owner: adminId }); // only the courts added by this admin
    res.status(200).json({ courts });

    }catch(error){
        res.status(500).json({ message: "Failed to fetch courts" });
    }

} 