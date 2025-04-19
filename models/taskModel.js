//import { Pool } from 'pg';
import pool from '../config/db.js';

// Get all tasks with optional search and filter
export async function getAllTasks(searchQuery = '', filter = 'all') {
  try {
    const values = [];
    let whereClause = [];
    
    // Search logic
    if (searchQuery) {
      values.push(`%${searchQuery.toLowerCase()}%`);
      whereClause.push(`(LOWER(title) LIKE $${values.length} OR LOWER(description) LIKE $${values.length})`);
    }

    // Filter logic
    if (filter === 'completed') {
      values.push(true);
      whereClause.push(`completed = $${values.length}`);
    } else if (filter === 'incomplete') {
      values.push(false);
      whereClause.push(`completed = $${values.length}`);
    }

    const query = `
      SELECT * FROM tasks 
      ${whereClause.length > 0 ? 'WHERE ' + whereClause.join(' AND ') : ''}
      ORDER BY created_at DESC
    `;

    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

// Create a new task
export async function createTask(title, description, priority) {
  const result = await pool.query(
    'INSERT INTO tasks (title, description, priority) VALUES ($1, $2, $3) RETURNING *',
    [title, description, priority]
  );
  return result.rows[0];
}


// Toggle completion status
export async function toggleTaskCompleted(id) {
  const result = await pool.query(
    'UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

// Delete a task
export async function deleteTask(id) {
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
}

// Update task title & description
export async function updateTask(id, title, description, priority) {
  const result = await pool.query(
    'UPDATE tasks SET title = $1, description = $2, priority = $3 WHERE id = $4 RETURNING *',
    [title, description, priority, id]
  );
  return result.rows[0];
}

