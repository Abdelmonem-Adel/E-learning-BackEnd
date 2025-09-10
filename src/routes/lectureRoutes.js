import express from "express";
import { createLecture , getLectures , getLecturesByCourse , getLectureById , updateLecture , deleteLecture} from "../controllers/lectureController.js";
import { uploadLectureVideo } from "../controllers/lectureController.js";
import upload from "../middlewares/uploadVideos.js";
import { authMiddleware, requireRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, requireRole(["instructor"]) , createLecture);
router.get("/list", getLectures);
router.get("/list-lecture-by-course/:courseId", getLecturesByCourse);
router.get("/get-by-id/:id", getLectureById);
router.put("/update/:id", authMiddleware, requireRole(["instructor"]) , updateLecture);
router.delete("/delete/:id", authMiddleware, requireRole(["instructor"]) , deleteLecture);
router.post("/upload-video/:id" , authMiddleware, requireRole(["instructor"]) , upload.single("video"), uploadLectureVideo);

export default router;
