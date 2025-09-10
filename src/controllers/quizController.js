import Quiz from "../DB/models/Quiz.js"
import Lecture from "../DB/models/Lecture.js";


export const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();

    
    await Lecture.findByIdAndUpdate(quiz.lectureId, {
      quizId: quiz._id
    });

    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("lectureId", "title");
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("lectureId", "title");
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





export const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    
    await Lecture.findByIdAndUpdate(quiz.lectureId, {
      $unset: { quizId: "" }
    });

    res.json({ message: "Quiz deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
