<div align="center">

# 🚀 TaskFlow

### Smart Task Manager built with the MERN Stack

<p>
  A modern full-stack task management application with secure authentication,
  CRUD operations, search, priority filters and a responsive dashboard.
</p>

<p>
  <a href="https://task-flow-seven-navy.vercel.app">
    <img src="https://img.shields.io/badge/Live%20Demo-Open%20TaskFlow-blue?style=for-the-badge&logo=vercel" />
  </a>

  <a href="https://taskflow-api-94oy.onrender.com/health">
    <img src="https://img.shields.io/badge/API-Live-success?style=for-the-badge&logo=render" />
  </a>
</p>

<p>
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=flat-square&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb&logoColor=white" />
</p>

</div>

<hr>
<h2 align="center">✨ Features</h2>

<table width="100%">
<tr>
<td width="50%" valign="top">

<h3>🔐 Authentication</h3>

<ul>
<li>User Registration</li>
<li>Secure Login</li>
<li>JWT Authentication</li>
<li>Protected Routes</li>
</ul>

</td>

<td width="50%" valign="top">

<h3>✅ Task Management</h3>

<ul>
<li>Create Tasks</li>
<li>Edit Tasks</li>
<li>Delete Tasks</li>
<li>Mark Complete / Pending</li>
</ul>

</td>
</tr>

<tr>
<td width="50%" valign="top">

<h3>🔍 Productivity</h3>

<ul>
<li>Search Tasks</li>
<li>Filter by Priority</li>
<li>Dashboard Statistics</li>
<li>User-specific Tasks</li>
</ul>

</td>

<td width="50%" valign="top">

<h3>⚡ User Experience</h3>

<ul>
<li>Loading States</li>
<li>Error Handling</li>
<li>Responsive UI</li>
<li>Cloud Data Persistence</li>
</ul>

</td>
</tr>
</table>

<hr>
<h2 align="center">🛠️ Tech Stack</h2>

<div align="center">

### Frontend

<img src="https://skillicons.dev/icons?i=react,vite,css" />

<br><br>

### Backend

<img src="https://skillicons.dev/icons?i=nodejs,express,mongodb" />

<br><br>

### Tools & Deployment

<img src="https://skillicons.dev/icons?i=git,github,vercel" />

</div>

<br>

<div align="center">

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, React Router, Axios, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| Deployment | Vercel, Render, MongoDB Atlas |

</div>

<hr>
<h2 align="center">📸 Project Preview</h2>

<p align="center">
  <img src="./screenshots/dashboard.png" width="850" alt="TaskFlow Dashboard" />
</p>

<p align="center">
  <b>TaskFlow Dashboard</b>
</p>

<br>

<table>
<tr>
<td width="50%">

<p align="center">
  <img src="./screenshots/login.png" width="100%" alt="TaskFlow Login" />
</p>

<p align="center">
  <b>Login Page</b>
</p>

</td>

<td width="50%">

<p align="center">
  <img src="./screenshots/edit-task.png" width="100%" alt="Edit Task" />
</p>

<p align="center">
  <b>Edit Task</b>
</p>

</td>
</tr>
</table>

<hr>
<h2 align="center">🏗️ Project Architecture</h2>

<p align="center">
  TaskFlow follows a clean MERN architecture where the React frontend communicates
  with the Node.js + Express backend through REST APIs, while MongoDB Atlas handles
  persistent cloud data storage.
</p>

<br>

```text
                         ┌─────────────────────┐
                         │        USER         │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    React + Vite     │
                         │      Frontend       │
                         │      (Vercel)       │
                         └──────────┬──────────┘
                                    │
                                    │ Axios
                                    │ REST API
                                    ▼
                         ┌─────────────────────┐
                         │ Node.js + Express   │
                         │       Backend       │
                         │      (Render)       │
                         └──────────┬──────────┘
                                    │
                                    │ Mongoose
                                    ▼
                         ┌─────────────────────┐
                         │    MongoDB Atlas    │
                         │      Database       │
                         └─────────────────────┘
```

<br>

<h3 align="center">🔄 Application Flow</h3>

```text
User
  │
  │ Register / Login
  ▼
React Frontend
  │
  │ POST /api/auth/login
  ▼
Express Backend
  │
  │ Verify Credentials
  │ Generate JWT
  ▼
JWT Token
  │
  │ Stored in Local Storage
  ▼
Protected Dashboard
  │
  │ Authorization: Bearer <token>
  ▼
Task APIs
  │
  ├── Create Task
  ├── Fetch Tasks
  ├── Update Task
  └── Delete Task
  │
  ▼
MongoDB Atlas
```

<br>

<h2 align="center">📁 Project Structure</h2>

```text
TaskFlow/
│
├── client/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Auth.css
│   │   │   └── Dashboard.css
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── screenshots/
│   ├── login.png
│   ├── dashboard.png
│   └── edit-task.png
│
├── .gitignore
└── README.md
```

<br>

<h3 align="center">⚙️ Architecture Breakdown</h3>

| Layer | Technology | Responsibility |
|---|---|---|
| 🎨 Frontend | React + Vite | UI, state management and user interactions |
| 🔗 API Client | Axios | Communication between frontend and backend |
| 🧭 Routing | React Router | Navigation and protected routes |
| ⚙️ Backend | Node.js + Express | REST APIs and application logic |
| 🔐 Authentication | JWT + bcryptjs | Secure login and password protection |
| 🛡️ Middleware | JWT Middleware | Protects private API routes |
| 🗃️ Database | MongoDB + Mongoose | Stores users and tasks |
| ☁️ Database Hosting | MongoDB Atlas | Cloud database infrastructure |
| ▲ Frontend Hosting | Vercel | Production React deployment |
| 🚀 Backend Hosting | Render | Production Express API deployment |

<hr>

<hr>
<h2 align="center">⭐ Support the Project</h2>

<p align="center">
  If you found TaskFlow useful or liked the project, consider giving the repository a ⭐ on GitHub.
</p>

<p align="center">
  <a href="https://task-flow-seven-navy.vercel.app">
    <img src="https://img.shields.io/badge/Try%20TaskFlow-Live%20Demo-2563EB?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
</p>

<br>

<div align="center">

### 🚀 TaskFlow

**Organize. Prioritize. Complete.**

<p>
  Built with ❤️ using the MERN Stack
</p>

<p>
  React • Node.js • Express.js • MongoDB • JWT • Vercel • Render
</p>

</div>