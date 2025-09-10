import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/db.connection.js";
import userRoutes from './routes/User.js'; 
import courseRoutes from "./routes/courseRoutes.js";
import lectureRouter from "./routes/lectureRoutes.js"
import quizRouter from "./routes/quizRoutes.js"
import quizResultRouter from "./routes/quizResultRouter.js"
import orderRoutes from "./routes/orderRoutes.js"

dotenv.config();

const app = express();


app.use(express.json());


connectDB();


// TEST
app.get("/", (req, res) => {
  res.send("E-Learning Backend is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lectures" , lectureRouter )
app.use("/api/quizzes" , quizRouter )
app.use("/api/quiz-results" , quizResultRouter )
app.use("/api/orders", orderRoutes);































const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


