import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

// Models for initial startup check
import Admin from './models/Admin.js';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Message from './models/Message.js';
import { sampleAdmin, sampleProjects, sampleSkills } from './seeders/seedData.js';

// Environment config
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    developer: 'Umar Rajpoot',
    role: 'MERN Stack Developer & Aspiring Software Engineer',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/stats', statsRoutes);

// 404 Handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;

// Initialize Server & auto-seed if needed
const startServer = async () => {
  try {
    const conn = await connectDB();

    if (conn) {
      // Auto-check and seed initial records if empty
      const adminCount = await Admin.countDocuments();
      if (adminCount === 0) {
        console.log('🌱 No admin detected. Auto-seeding initial admin...');
        await Admin.create(sampleAdmin);
      }

      const projectCount = await Project.countDocuments();
      if (projectCount === 0) {
        console.log('🌱 No projects detected. Auto-seeding portfolio projects...');
        await Project.insertMany(sampleProjects);
      }

      const skillCount = await Skill.countDocuments();
      if (skillCount === 0) {
        console.log('🌱 No skills detected. Auto-seeding technical skills...');
        await Skill.insertMany(sampleSkills);
      }
    }

    app.listen(PORT, () => {
      console.log(`🚀 Umar Rajpoot Portfolio Server running on port ${PORT}`);
      console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
  }
};

startServer();
