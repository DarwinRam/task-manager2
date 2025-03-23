import { getAllTasks, addTask, toggleTaskCompletion, deleteTask } from "../models/taskModel.js";


export const renderHomePage = async (req, res) => {
  try{
    const tasks = await getAllTasks();
    res.render("index", {tasks});
  }catch(error){
    res.status(500).render("error",{message: "Error fetching tasks"});
  }
};

export const createTask = async(req, res)=>{
    const {title, description} = req.body;

    if(!title || title.lenght < 3 || title.lenght > 50){
        return res.status(400).render("error", {message: "Invalid task title"});
    }
    try{
        await addTask(title, description);
        res.redirect("/");
    }catch(error){
        res.status(500).render("error",{message: "Failed to create task"});
    }
};
  




