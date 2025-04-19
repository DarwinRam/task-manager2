import express from 'express';
import {
  renderHomePage,
  handleCreateTask,
  handleToggleComplete,
  handleDeleteTask,
  handleUpdateTask,
} from '../controllers/taskController.js';

const router = express.Router();

// Main page with task list and form
router.get('/', renderHomePage);

// Add new task
router.post('/tasks', handleCreateTask);

// Toggle task completion
router.patch('/tasks/:id', handleToggleComplete);

// Delete task
router.delete('/tasks/:id', handleDeleteTask);

// Update task title & description
router.put('/tasks/:id', handleUpdateTask);

export default router;
