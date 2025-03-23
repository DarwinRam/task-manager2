import express from "express";
const router = express.Router();
import {
    renderHomePage,
    createTask,
    completeTask,
    removeTask,
} from "../controllers/taskController.js";

router.get("/", renderHomePage);

router.post("/tasks", createTask);

router.patch("/tasks/:id", completeTask);

router.delete("/tasks/:id", removeTask);

export default router;
