# ⚡ Umar Rajpoot - Full-Stack MERN Developer Portfolio

A modern, responsive personal portfolio website and content management system built with the complete **MERN Stack** (MongoDB, Express.js, React.js, Node.js), Tailwind CSS, and JWT Authentication.

---

## 🚀 Live Features Overview

### 1. Public Portfolio
- **Hero / Presentation Section:** Dynamic typewriter effect displaying key developer roles, live availability indicator, CTA buttons (Explore Projects, Contact Me, Download Resume), developer code terminal widget, and quick social links (GitHub, LinkedIn, Email).
- **About Me:** Professional background, core engineering highlights, statistics counters, and education credentials.
- **Dynamic Technical Skills:** Fetched dynamically from the Express REST API and MongoDB. Categorized into *Frontend*, *Backend*, *Database*, and *Tools & DevOps* with interactive progress bars and category filter tabs.
- **Dynamic Projects Showcase:** Filterable by category (*All*, *Full Stack*, *Frontend*, *Backend*), featuring project images, descriptions, technology badges, GitHub repository links, live deployment links, and a full-screen **Details Modal**.
- **Education & Experience Timeline:** Academic journey (BS in Computer Science) and practical software engineering / freelance experience.
- **Working Contact Form:** Validates user input and sends messages directly to the Express backend and MongoDB database with real-time feedback notifications.
- **Responsive Navigation & Footer:** Sticky blur navbar with mobile slide-in drawer, quick jump links, and back-to-top button.

### 2. Admin Management System
- **Secure Authentication:** Admin login with hashed passwords via `bcryptjs` and stateless session verification using `jsonwebtoken` (JWT).
- **Protected Dashboard Route:** Guarded by client-side auth context and backend JWT bearer authorization middleware.
- **Overview Metrics:** Summary metrics for *Total Projects*, *Total Skills*, *Total Messages*, and *Unread Messages*.
- **Full Project CRUD:**
  - Create new projects with title, category, description, tech stack, and links.
  - Image upload support via `multer` as well as external image URLs.
  - Edit existing projects.
  - Delete projects.
  - Live synchronization with the public portfolio.
- **Full Skills CRUD:**
  - Add technical skills with category and proficiency percentage slider.
  - Edit or delete existing skills.
- **Message Center:**
  - View all contact inquiries submitted through the contact form.
  - Toggle messages as Read / Unread.
  - One-click email reply via `mailto:`.
  - Delete messages.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, React Router DOM v6, Tailwind CSS, Axios, Lucide React Icons |
| **Backend** | Node.js, Express.js (ES Modules) |
| **Database** | MongoDB & Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs password hashing |
| **Media Handling** | Multer disk storage for project asset uploads |
| **Environment** | dotenv, CORS |

---

## 📁 Project Structure

```
Portfolio/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection logic
│   ├── controllers/
│   │   ├── authController.js     # Admin auth & profile controllers
│   │   ├── projectController.js  # Project CRUD logic
│   │   ├── skillController.js    # Skills CRUD logic
│   │   ├── messageController.js  # Contact form & inbox logic
│   │   └── statsController.js    # Dashboard metrics
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT Bearer token protection
│   │   └── uploadMiddleware.js   # Multer file upload configuration
│   ├── models/
│   │   ├── Admin.js              # Admin schema with bcrypt hooks
│   │   ├── Project.js            # Project schema & validations
│   │   ├── Skill.js              # Skill schema & validations
│   │   └── Message.js            # Contact form schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── skillRoutes.js
│   │   ├── messageRoutes.js
│   │   └── statsRoutes.js
│   ├── seeders/
│   │   └── seedData.js           # Sample dataset & seed runner
│   ├── uploads/                  # Uploaded project screenshots
│   ├── .env.example
│   ├── .env                      # Environment configuration
│   ├── package.json
│   └── server.js                 # Express application entry point
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectModal.jsx
│   │   │   ├── EducationExperience.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Auth state & token persistence
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Main public portfolio
│   │   │   ├── AdminLogin.jsx     # Admin sign-in page
│   │   │   └── AdminDashboard.jsx # Admin management portal
│   │   ├── services/
│   │   │   └── api.js            # Axios client & API endpoints
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css             # Tailwind base & custom glows
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── package.json
└── README.md
```

---

## ⚙️ Quick Start Guide

### Prerequisites
1. **Node.js** (v18 or higher installed)
2. **MongoDB** (local service `mongodb://127.0.0.1:27017` or a MongoDB Atlas connection string)

### 1. Configure Backend Environment
The `backend/.env` file is already prepared:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/umar_portfolio
JWT_SECRET=super_secret_jwt_token_key_for_umar_portfolio_2026
ADMIN_EMAIL=admin@umarrajpoot.dev
ADMIN_PASSWORD=Admin@123456
NODE_ENV=development
```

### 2. Seed Initial Data
Seed initial showcase projects, skills, and admin account:
```bash
cd backend
npm run seed
```

### 3. Run the Backend Server
```bash
cd backend
npm run dev
# or: npm start
```
*Backend runs on: `http://localhost:5000`*  
*Health Check: `http://localhost:5000/api/health`*

### 4. Run the React Frontend
In a second terminal window:
```bash
cd frontend
npm run dev
```
*Frontend runs on: `http://localhost:3000`*

---

## 🔐 Admin Credentials

| Key | Value |
|---|---|
| **Login Route** | `http://localhost:3000/admin/login` |
| **Email** | `admin@umarrajpoot.dev` |
| **Password** | `Admin@123456` |

*(Tip: On the `/admin/login` page, click the "Fill Default Admin Credentials" button to test instantly.)*

---

## 📡 REST API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login & JWT token retrieval
- `GET /api/auth/me` *(Protected)* - Get current admin session
- `PUT /api/auth/profile` *(Protected)* - Update admin details

### Projects
- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/:id` - Get single project by ID (public)
- `POST /api/projects` *(Protected)* - Create new project with optional image upload
- `PUT /api/projects/:id` *(Protected)* - Update existing project
- `DELETE /api/projects/:id` *(Protected)* - Delete project

### Skills
- `GET /api/skills` - Get all technical skills (public)
- `POST /api/skills` *(Protected)* - Add a new technical skill
- `PUT /api/skills/:id` *(Protected)* - Update technical skill
- `DELETE /api/skills/:id` *(Protected)* - Delete technical skill

### Messages
- `POST /api/messages` - Submit contact form inquiry (public)
- `GET /api/messages` *(Protected)* - View all received messages
- `PATCH /api/messages/:id/read` *(Protected)* - Toggle read/unread status
- `DELETE /api/messages/:id` *(Protected)* - Delete message

### Dashboard Statistics
- `GET /api/stats` *(Protected)* - Summary metrics & counts
