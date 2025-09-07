// models/User.js placeholder
import mongoose from "mongoose";    

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['student', 'instructor'],
    required: true
  },
  First_Name: {
    type: String,
    required: true,
    minlength: [3, 'First Name must be at least 3 characters long'],
    maxlength: [100, 'First Name must be less than 100 characters long']
  },
  Last_Name:{
    type: String,
    required: true,
    minlength: [3, 'Last Name must be at least 3 characters long'],
    maxlength: [100, 'Last Name must be less than 100 characters long']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long']
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio must not exceed 500 characters']
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
}, { timestamps: true });

export default mongoose.model("User", userSchema);
