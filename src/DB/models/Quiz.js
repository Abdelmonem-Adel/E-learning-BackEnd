// models/Quiz.js placeholder
import mongoose from "mongoose";
const quizSchema = new mongoose.Schema({
  lectureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecture',
    required: true
  },
  questions: [{
    questionText: {
      type: String,
      required: true,
      minlength: [5, 'Question must be at least 5 characters long']
    },
    options: {
      type: [String],
      validate: [arr => arr.length >= 2, 'At least 2 options are required']
    },
    correctAnswer: {
      type: String,
      required: true,
      validate: {
        validator: function (val) {
          return this.options.includes(val);
        },
        message: 'Correct answer must be one of the options'
      }
    }
  }]
}, { timestamps: true });
export default mongoose.model("Quiz", quizSchema);