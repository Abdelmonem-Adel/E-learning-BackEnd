import express from "express";
import { createCourse , getCourses , getCourseById , updateCourse , deleteCourse , enrollStudent} from "../controllers/courseController.js";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/create", authMiddleware, requireRole(["instructor"]) , createCourse);
router.get("/list", getCourses);
router.get("/list-by-id/:id", getCourseById);
router.put("/update/:id", authMiddleware, requireRole(["instructor"]) , updateCourse);
router.delete("/delete/:id", authMiddleware, requireRole(["instructor"]) , deleteCourse);
router.post("/enroll-std/:id", enrollStudent);
 
export default router;
