const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createTask,
    getTasks,
    updateTask
} = require("../controllers/taskController");

router.post("/", protect, createTask);

router.get("/", protect, getTasks);

router.put("/:id",protect,updateTask);

module.exports = router;