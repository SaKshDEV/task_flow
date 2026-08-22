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
            title,
            description,
            priority,
            user: req.user.userId
        });

        res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        console.log("CREATE TASK ERROR:", error.message);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getTasks = async (req, res) => {
    try {

        const tasks = await Task.find({
            user: req.user.userId
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            count: tasks.length,
            tasks
        });

    } catch (error) {

        console.log("GET TASKS ERROR:", error.message);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const updateTask = async (req,res)=>{
    try{
        const {title, description,priority, completed} = req.body;

        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.userId
        });
        if(!task){
            return res.status(404).json({
                message:"TASK NOT FOUND"
            });
        }
        task.title = title ?? task.title;
        task.description = description ?? task.description;
        task.priority = priority ?? task.priority;
        task.completed = completed ?? task.completed;

        await task.save();

        res.status(200).json({
            message:" task updated succesfully",
            task
        })
        
    }catch(error){
        console.log("UPDATE TASK ERROR" , error.message);

        res.status(500).json({
            message: "server error",
            error: error.message
        });

    }
}


module.exports = {
    createTask,
    getTasks,
    updateTask
};