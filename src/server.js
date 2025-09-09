import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/db.connection.js";
import userRoutes from './routes/User.js'; 



dotenv.config();

const app = express();


app.use(express.json());


connectDB();


// TEST
app.get("/", (req, res) => {
  res.send("E-Learning Backend is running...");
});
app.use("/api/users", userRoutes);































const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


