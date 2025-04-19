import {
  getAllTasks,
  createTask,
  toggleTaskCompleted,
  deleteTask,
  updateTask
} from '../models/taskModel.js';

  export async function renderHomePage(req, res) {
    try {
      const search = req.query.search || '';
      const filter = req.query.filter || 'all';
      const editId = req.query.edit;
  
      const tasks = await getAllTasks(search, filter);
      
  
      // Find the task to edit
      const taskToEdit = editId ? tasks.find(task => task.id.toString() === editId) : null;
  
      res.render('index', {
        tasks,
        errors: [],
        search,
        formData: taskToEdit || {},
        filter,
        editMode: !!taskToEdit,
        editId: editId || null,
        
      });
      
    } catch (error) {
      res.status(500).render('error', { message: 'Failed to load tasks.' });
    }   
  }

  export async function handleCreateTask(req, res) {
    const { title, description, priority } = req.body;
    const search = req.query.search || '';
    const filter = req.query.filter || 'all';
  
    const errors = [];
  
    if (!title || title.trim() === '') {
      errors.push({ msg: 'Title is required.' });
    } else if (title.trim().length < 3 || title.trim().length > 100) {
      errors.push({ msg: 'Title must be between 3 and 100 characters.' });
    }
  
    if (errors.length > 0) {
      const tasks = await getAllTasks(search, filter);
      return res.render('index', {
        tasks,
        errors,
        search,
        filter,
        formData: { title, description, priority },
        editMode: false,     
        editId: null         
      });
    }
  
    try {
      await createTask(title, description, priority);
      res.redirect('/');
    } catch (error) {
      res.status(500).render('error', { message: 'Failed to create task.' });
    }
  }   

// PATCH /tasks/:id
export async function handleToggleComplete(req, res) {
  try {
    await toggleTaskCompleted(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Failed to update task.' });
  }
}

// DELETE /tasks/:id
export async function handleDeleteTask(req, res) {
  try {
    await deleteTask(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Failed to delete task.' });
  }
}

// PUT /tasks/:id
export async function handleUpdateTask(req, res) {
  const { title, description, priority } = req.body;
  const errors = [];

  if (!title || title.length < 3 || title.length > 100) {
    errors.push({ msg: 'Title must be between 3 and 100 characters.' });
  }
  if (description && description.trim().length > 500) {
    errors.push({ msg: 'Description cannot exceed 500 characters.' });
  }

  if (errors.length > 0) {
    const tasks = await getAllTasks(req.query.search || '', req.query.filter || 'all');
    return res.status(400).render('index', {
      tasks,
      errors,
      formData: { title, description, priority },
      search: req.query.search || '',
      filter: req.query.filter || 'all',
      editMode: true,
      editId: req.params.id,
    });
  }

  try {
    await updateTask(req.params.id, title, description, priority); // 💡 Include priority
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Failed to update task.' });
  }
}

