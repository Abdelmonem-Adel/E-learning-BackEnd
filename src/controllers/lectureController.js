import Lecture from "../DB/models/Lecture.js";
import Course from "../DB/models/Course.js";
import cloudinary from "../config/cloudinary.js";



export const createLecture = async (req, res) => {
  try {
    const lecture = new Lecture(req.body);
    await lecture.save();

    await Course.findByIdAndUpdate(lecture.courseId, {
      $push: { lectures: lecture._id }
    });

    res.status(201).json(lecture);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



export const getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find().populate("courseId", "title");
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getLecturesByCourse = async (req, res) => {
  try {
    const lectures = await Lecture.find({ courseId: req.params.courseId })
      .populate("courseId", "title");
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export const getLectureById = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id)
      .populate("courseId", "title")
      .populate("quizId");
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });
    res.json(lecture);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export const updateLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });
    res.json(lecture);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



export const deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndDelete(req.params.id);
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });
    

    await Course.findByIdAndUpdate(lecture.courseId, {
      $pull: { lectures: lecture._id }
    });

    res.json({ message: "Lecture deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const uploadLectureVideo = async (req, res) => {
  try {
    const lectureId = req.params.id;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });

    const course = await Course.findById(lecture.courseId);
    if (!course) return res.status(404).json({ message: "Parent course not found" });

    if (req.user.role !== "instructor" || req.user.id !== String(course.instructorId)) {
      return res.status(403).json({ message: "Not authorized to upload for this lecture" });
    }

    if (!req.file) return res.status(400).json({ message: "No video file uploaded" });

    const videoUrl = req.file.path || req.file.secure_url || req.file.url || (req.file && req.file[0] && req.file[0].path);
    
    lecture.uploadVideo = videoUrl;
    
    await lecture.save();

    res.status(200).json({ message: "Video uploaded", lecture });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Upload failed" });
  }
};
