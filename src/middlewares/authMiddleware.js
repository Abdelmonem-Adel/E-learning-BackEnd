// middlewares/authMiddleware.js placeholder

// Authentication
import jwt from "jsonwebtoken";
import User from "../DB/models/User.js";
export const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if(!authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try{
        const decoded=jwt.verify(authorization.split(" ")[1], "your_secret_key");
        req.user=decoded;
        next();
    } catch(err) {
        return res.status(401).json({ message: "Unauthorized" });   
    }
};



// Authorization

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
};