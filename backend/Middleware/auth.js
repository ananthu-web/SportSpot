import jwt from "jsonwebtoken";
import User from "../Models/User.js";

// Auth middleware
export const authMiddleware = async (req, res, next) => {
  let token;

  // 1️⃣ Check if Authorization header exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2️⃣ Get the token from header
      token = req.headers.authorization.split(" ")[1];

      // 3️⃣ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4️⃣ Attach user info to req.user (without password)
      req.user = await User.findById(decoded.id).select("-password");

      // 5️⃣ Call next() to move to controller
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // 6️⃣ If no token found
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Admin middleware
export const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // allow admin
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};