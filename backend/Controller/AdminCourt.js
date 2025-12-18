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


export const getCourtById = async (req, res) => {
  try {
    const court = await Court.findById(req.params.id);

    if (!court) {
      return res.status(404).json({ message: "Court not found" });
    }

    res.json({ court });
  } catch (err) {
    res.status(500).json({ message: "Error fetching court" });
  }
};




// Update an existing court
export const updateCourt = async (req, res) => {
  try {
    const courtId = req.params.id; // Get court ID from URL
    const updateData = { ...req.body };

    // Prevent changing ownership
    delete updateData.owner;


    // Update court in MongoDB
    const updatedCourt = await Court.findByIdAndUpdate(
      courtId,
      updateData,
      { new: true, runValidators: true } // return updated doc & validate
    );

    if (!updatedCourt) {
      return res.status(404).json({ message: "Court not found" });
    }

    res.status(200).json({
      message: "Court updated successfully",
      court: updatedCourt,
    });
  } catch (err) {
    console.error("Error updating court:", err);
    res.status(500).json({ message: err.message || "Failed to update court" });
  }
};



// Delete a court
export const deleteCourt = async (req, res) => {
  try {
    const courtId = req.params.id;
    const adminId = req.user._id;

    // Make sure the court exists and belongs to this admin
    const court = await Court.findOne({ _id: courtId, owner: adminId });
    if (!court) {
      return res.status(404).json({ message: "Court not found or not authorized" });
    }

    // Delete the court
    await Court.findByIdAndDelete(courtId);

    res.status(200).json({ message: "Court deleted successfully" });
  } catch (err) {
    console.error("Error deleting court:", err);
    res.status(500).json({ message: "Failed to delete court" });
  }
};