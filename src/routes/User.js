import express from "express";
import { RegisterUser } from "../controllers/User.js";  // 👈 make sure User.js exports properly

const router = express.Router();

// Register route
router.post("/register", RegisterUser);

export default router;
