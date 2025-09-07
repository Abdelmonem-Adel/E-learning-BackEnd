import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: [0, 'Score cannot be negative']
  },
  isPassed: {
    type: Boolean,
    default: false
  },
  attempts: {
    type: Number,
    default: 1,
    min: 1
  },
  takenAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model("QuizResult", quizResultSchema);
