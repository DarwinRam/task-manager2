import express from 'express';
import dotenv from 'dotenv';
import methodOverride from 'method-override';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');

// Routes
app.use('/', taskRoutes);

// 404 Page
app.use((req, res) => {
  res.status(404).render('error', { message: 'Page Not Found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



