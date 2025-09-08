// models/Course.js placeholder

import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [3, 'Title must be at least 3 characters long']
  },
  description: {
    type: String,
    maxlength: [2000, 'Description too long']
  },
  category: {
    type: String,
    enum: ['Programming', 'Math', 'Science', 'Business', 'Art', 'Other'],
    default: 'Other'
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  lectures: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecture'
  }]
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
