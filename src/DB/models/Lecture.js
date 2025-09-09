const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [3, 'Lecture title must be at least 3 characters long']
  },
  uploadVideo: {
    type: String,
    required: true,
    match: [/^https?:\/\/.+\.(mp4|mov|avi|mkv|webm)$/, 'Invalid video URL']
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }
}, { timestamps: true });

module.exports = mongoose.model('Lecture', lectureSchema);
