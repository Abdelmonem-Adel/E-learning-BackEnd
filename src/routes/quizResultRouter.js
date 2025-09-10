import express from "express";
import { submitQuiz , getResults , getStudentResults } from "../controllers/quizResultController.js";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/submit", submitQuiz); 
router.get("/all-result", authMiddleware , requireRole(["instructor"]) , getResults); 
router.get("/student/:studentId", getStudentResults); 


export default router;
