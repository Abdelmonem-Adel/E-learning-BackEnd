import QuizResult from "../DB/models/QuizResult.js";
import Quiz from "../DB/models/Quiz.js";


export const submitQuiz = async (req, res) => {
  try {
    const { studentId, quizId, answers } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;

    
    quiz.questions.forEach((q, index) => {
      if (answers[index] && answers[index] === q.correctAnswer) {
        score++;
      }
    });

    const isPassed = score >= Math.ceil(quiz.questions.length / 2); 

    const result = new QuizResult({
      studentId,
      quizId,
      score,
      isPassed,
    });

    await result.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};




export const getResults = async (req, res) => {
  try {
    const results = await QuizResult.find()
      .populate("studentId", "name email")
      .populate("quizId", "lectureId");
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getStudentResults = async (req, res) => {
  try {
    const results = await QuizResult.find({ studentId: req.params.studentId })
      .populate("quizId", "lectureId");
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





