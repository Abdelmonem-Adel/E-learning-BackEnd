// middlewares/authMiddleware.js placeholder
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