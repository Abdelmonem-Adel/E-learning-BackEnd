import express from "express";
import { RegisterUser } from "../controllers/User.js";  // 👈 make sure User.js exports properly
import { getAllUsers } from "../controllers/User.js"; // Example import for another controller function
import { getById } from "../controllers/User.js"; // Example import for another controller function
import { updateUser } from "../controllers/User.js";
import { deleteUser } from "../controllers/User.js";
import { LoginUser } from "../controllers/User.js";  // 👈 make sure User.js exports properly
const router = express.Router();

// Register route
router.post("/register", RegisterUser);
router.get("/getAll", getAllUsers); // Example route to get all users
router.get("/getById/:id", getById); // Example route to get user by ID
router.put("/updateUser/:id", updateUser); // Example route to update user by ID
router.delete("/deleteUser/:id", deleteUser); // Example route to delete user by ID
router.post("/login", LoginUser);
export default router;
