const Task = require("../models/Task");

const createTask = async (req, res) => {
    try {
        const { title, description, priority } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const task = await Task.create({
            title: title,
            description: description,
            priority: priority,
            user: req.user.userId
        });

        res.status(201).json({
            message: "Task created successfully",
            task: task
        });

    } catch (error) {
        console.log("CREATE TASK ERROR:", error.message);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    createTask
};