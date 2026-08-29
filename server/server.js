const express = require("express");
const cors = require("cors");
require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");


const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes")

const app = express();

connectDB();

app.use(cors({
   origin: [
      "http://localhost:5173",
      "https://task-flow-seven-navy.vercel.app"
   ],
   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
   allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
   res.json({
      message: "task flow api is running"
   });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`sever running on port ${PORT}`);
});