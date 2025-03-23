import { getAllTasks, addTask, toggleTaskCompletion, deleteTask } from "../models/taskModel.js";


export const renderHomePage = async (req, res) => {
  try{
    const tasks = await getAllTasks();
    res.render("index", {tasks});
  }catch(error){
    res.status(500).render("error",{message: "Error fetching tasks"});
  }
};








