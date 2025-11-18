import mongoose from "mongoose";

const SportsSchema=new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true}
},
{
    timestamps:true
})

export default mongoose.model("Sport", SportsSchema);