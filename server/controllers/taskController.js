const Task = require("../models/Task");

const createTask = async(req,res)=>{
    try{
        const { title,priority,description} = req.body;

        if(!title){
            res.status(400).json({
                message:"title is required"
        });
        }
        const task = await task.create({
            title,
            description,
            priority,
            user: req.user.userId
        });
        res.status(201).json({
         message: "task created succesfully",
         task
        });
     }catch(error){
        res.status(500).json({
            message: "server error",
            error: error.message
        });
     }
}
module.exports={
    createTask
};

