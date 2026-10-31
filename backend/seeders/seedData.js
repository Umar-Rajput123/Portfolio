import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Admin from '../models/Admin.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Message from '../models/Message.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const sampleAdmin = {
  name: 'Umar Rajpoot',
  email: process.env.ADMIN_EMAIL || 'admin@umarrajpoot.dev',
  password: process.env.ADMIN_PASSWORD || 'Admin@123456',
  role: 'admin',
};

const sampleProjects = [
  {
    title: 'ShopZenith - Modern MERN E-Commerce Platform',
    description:
      'A full-featured multi-vendor e-commerce platform built with React, Node.js, Express, and MongoDB. Features secure Stripe payment processing, JWT authentication, real-time inventory management, order tracking, and an extensive admin analytics dashboard.',
    category: 'Full Stack',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux Toolkit', 'Tailwind CSS', 'Stripe API'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/umarrajpoot/shopzenith-mern-ecommerce',
    liveUrl: 'https://shopzenith-demo.vercel.app',
    featured: true,
    order: 1,
  },
  {
    title: 'DevPulse - AI-Powered Code Reviewer & Assistant',
    description:
      'An intelligent developer platform that analyzes code repositories for vulnerabilities, performance bottlenecks, and style conformity. Integrates LLM APIs with an Express microservice architecture and interactive React UI.',
    category: 'Full Stack',
    technologies: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI API', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/umarrajpoot/devpulse-code-review',
    liveUrl: 'https://devpulse-preview.vercel.app',
    featured: true,
    order: 2,
  },
  {
    title: 'TaskFlow - Real-Time Agile Collaboration Workspace',
    description:
      'A collaborative Kanban and sprint management application designed for agile development teams. Includes real-time Socket.io updates, drag-and-drop task boards, activity logs, and granular role-based access control.',
    category: 'Full Stack',
    technologies: ['React.js', 'Node.js', 'Socket.io', 'Express.js', 'MongoDB', 'JWT', 'Lucide React'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/umarrajpoot/taskflow-agile-workspace',
    liveUrl: 'https://taskflow-workspace.vercel.app',
    featured: true,
    order: 3,
  },
  {
    title: 'CloudDocs - Collaborative Real-Time Markdown Editor',
    description:
      'A sleek markdown note-taking and documentation platform with live preview, syntax highlighting, PDF export, document versioning, and cloud synchronization.',
    category: 'Frontend',
    technologies: ['React.js', 'Vite', 'Tailwind CSS', 'Highlight.js', 'KaTeX', 'IndexedDB'],
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/umarrajpoot/clouddocs-markdown',
    liveUrl: 'https://clouddocs-editor.vercel.app',
    featured: false,
    order: 4,
  },
  {
    title: 'RestAuth API - Microservice Authentication Engine',
    description:
      'A hardened, production-ready RESTful authentication service with refresh token rotation, bcrypt hashing, rate limiting, helmet security headers, and automated test coverage with Jest.',
    category: 'Backend',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Jest', 'Supertest', 'Docker'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    githubUrl: 'https://github.com/umarrajpoot/restauth-service-engine',
    liveUrl: 'https://api.umarrajpoot.dev/docs',
    featured: false,
    order: 5,
  },
];

const sampleSkills = [
  // Frontend
  { name: 'React.js', category: 'Frontend', proficiency: 92, icon: 'Atom', featured: true, order: 1 },
  { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 95, icon: 'FileCode2', featured: true, order: 2 },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 90, icon: 'Palette', featured: true, order: 3 },
  { name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 96, icon: 'Layout', featured: true, order: 4 },
  { name: 'Redux Toolkit', category: 'Frontend', proficiency: 85, icon: 'Layers', featured: false, order: 5 },
  { name: 'Vite & Next.js', category: 'Frontend', proficiency: 82, icon: 'Zap', featured: false, order: 6 },

  // Backend
  { name: 'Node.js', category: 'Backend', proficiency: 90, icon: 'Server', featured: true, order: 1 },
  { name: 'Express.js', category: 'Backend', proficiency: 92, icon: 'Cpu', featured: true, order: 2 },
  { name: 'RESTful API Design', category: 'Backend', proficiency: 94, icon: 'Network', featured: true, order: 3 },
  { name: 'JWT & Authentication', category: 'Backend', proficiency: 88, icon: 'ShieldCheck', featured: true, order: 4 },
  { name: 'Socket.io', category: 'Backend', proficiency: 80, icon: 'Radio', featured: false, order: 5 },

  // Database
  { name: 'MongoDB', category: 'Database', proficiency: 90, icon: 'Database', featured: true, order: 1 },
  { name: 'Mongoose ODM', category: 'Database', proficiency: 92, icon: 'FolderGit2', featured: true, order: 2 },
  { name: 'PostgreSQL / SQL', category: 'Database', proficiency: 78, icon: 'Table2', featured: false, order: 3 },
  { name: 'Redis Caching', category: 'Database', proficiency: 75, icon: 'Flame', featured: false, order: 4 },

  // Tools & DevOps
  { name: 'Git & GitHub', category: 'Tools & DevOps', proficiency: 92, icon: 'GitBranch', featured: true, order: 1 },
  { name: 'Postman / Insomnia', category: 'Tools & DevOps', proficiency: 94, icon: 'Send', featured: true, order: 2 },
  { name: 'Docker & Containers', category: 'Tools & DevOps', proficiency: 76, icon: 'Box', featured: false, order: 3 },
  { name: 'Vercel & Render', category: 'Tools & DevOps', proficiency: 88, icon: 'CloudUpload', featured: true, order: 4 },
];

const sampleMessages = [
  {
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@techrecruits.io',
    subject: 'Full-Stack Developer Opportunity at NovaTech Solutions',
    message:
      'Hi Umar, I came across your impressive MERN portfolio projects, specifically your ShopZenith and DevPulse platforms. We have an exciting opening for a Software Engineer role and would love to connect for a quick introductory chat.',
    read: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    name: 'David Chen',
    email: 'david@innovatestudio.com',
    subject: 'Inquiry regarding freelance SaaS web application build',
    message:
      'Hello Umar! We are looking to collaborate on building a high-performance customer dashboard using React, Tailwind, and Node.js. Your skills match our roadmap perfectly.',
    read: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/umar_portfolio';
    console.log(`Connecting to MongoDB at: ${mongoUri}...`);
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB for seeding.');

    // Seed Admin
    await Admin.deleteMany({});
    await Admin.create(sampleAdmin);
    console.log(`✅ Admin seeded: ${sampleAdmin.email} (Password: ${sampleAdmin.password})`);

    // Seed Projects
    await Project.deleteMany({});
    await Project.insertMany(sampleProjects);
    console.log(`✅ Seeded ${sampleProjects.length} Projects.`);

    // Seed Skills
    await Skill.deleteMany({});
    await Skill.insertMany(sampleSkills);
    console.log(`✅ Seeded ${sampleSkills.length} Technical Skills.`);

    // Seed Messages
    await Message.deleteMany({});
    await Message.insertMany(sampleMessages);
    console.log(`✅ Seeded ${sampleMessages.length} Messages.`);

    console.log('🎉 Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

// If run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedDB();
}

export { seedDB, sampleAdmin, sampleProjects, sampleSkills };
