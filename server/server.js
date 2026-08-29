const express = require("express");
const cors = require("cors");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://task-flow-seven-navy.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Explicitly handle browser preflight
app.options(/.*/, cors(corsOptions));

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        version: "cors-fix-2"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "task flow api is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});