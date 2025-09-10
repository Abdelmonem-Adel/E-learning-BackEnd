import express from "express";
import {createQuiz , getQuizzes , getQuizById , updateQuiz , deleteQuiz} from "../controllers/quizController.js";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, requireRole(["instructor"]) , createQuiz);
router.get("/get-quizzes", getQuizzes);
router.get("/get-by-id/:id", getQuizById);
router.put("/update/:id", authMiddleware, requireRole(["instructor"]) , updateQuiz);
router.delete("/delete/:id", authMiddleware, requireRole(["instructor"]) , deleteQuiz);

export default router;
