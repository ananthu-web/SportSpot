import Court from "../Models/Court.js";


export const AddCourt = async (req, res) => {
  try {
    const court = new Court(req.body);
    const savedCourt = await court.save();
    res.status(201).json(savedCourt);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};