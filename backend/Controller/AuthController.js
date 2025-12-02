import User from "../Models/User.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


// Generate JWT
const generateToken = (id,isAdmin) => {
  return jwt.sign({ id,isAdmin }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Signup
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    const token=generateToken(user._id,user.isAdmin)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      isAdmin:user.isAdmin
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        const token =generateToken(user._id,user.isAdmin)

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin:user.isAdmin,
        token,
      });
      
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// update profile

export const  updateProfile = async (req,res)=>{
  try{
      const {
      name,
      email,
      phone,
      address,
      city,
      state,
      country,
      postalCode,
    } = req.body;

    // 2️⃣ Find logged-in user (from authMiddleware)
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

     // 4️⃣ Update profile fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.city = city || user.city;
    user.state = state || user.state;
    user.country = country || user.country;
    user.postalCode = postalCode || user.postalCode;

    // 5️⃣ Save updated user to MongoDB
    await user.save();

    const token=generateToken(user._id,user.isAdmin)

     // 6️⃣ Return updated user to frontend
    res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        country: user.country,
        postalCode: user.postalCode,
        isAdmin:user.isAdmin,
        token
      },
    });

  }
  
  catch(err) {
    console.error(err);
    res.status(500).json({ message: "Profile update  error" });
  }
  
};


export const updatePassword=async(req,res)=>{

  try{
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: "All fields are required" });

     const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

     const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });

    user.password = newPassword; // hashed automatically by schema pre-save
    await user.save();

    res.json({ message: "Password changed successfully" });
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: "Password change error" });
  }

}


