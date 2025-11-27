import User from "../Models/User.js"
import jwt from "jsonwebtoken";


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
      console.log(token);
      
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

