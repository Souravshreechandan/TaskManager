const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

//api to get all task
router.get("/", async (req, res)=>{
    try{
        const tasks = await Task.find().sort({createdAt:-1});
        res.json(tasks);
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

//api to add a task
router.post("/",async(req, res)=>{
    try {
        const title = req.body.title?.trim();

        if(!title){
            return res.status(400).json({message: "Enter a task name"});
        }

        const task = await Task.create({title});
        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//api to mark complete or undo the task
router.patch("/:id",async(req,res)=>{
    try {
        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({message:"Task not found"});
        }
        task.completed = !task.completed;
        await task.save();
        res.json(task);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//api to delete a task
router.delete("/:id", async(req,res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).json({message: "Task not found"});
        }

        res.json({message:"Task deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;