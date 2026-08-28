# TaskFlow — Smart Task Manager

TaskFlow is a full-stack task management application built using the MERN stack. It allows users to securely create, manage, update, search, filter, and track their personal tasks.

## Features

- User Registration and Login
- JWT Authentication
- Protected Routes
- Create Tasks
- View Personal Tasks
- Edit Tasks
- Delete Tasks
- Mark Tasks as Completed or Pending
- Priority Management
- Search Tasks
- Filter Tasks by Priority
- Dashboard Statistics
- Loading and Error States
- Responsive UI

## Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

## Project Structure

```text
TaskFlow/
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
│
├── .gitignore
└── README.md
```

## Local Setup

### Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
cd TaskFlow
```

### Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Run backend:

```bash
npm run dev
```

### Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Protected profile |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks` | Get user's tasks |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## Authentication

Protected requests use:

```text
Authorization: Bearer <token>
```

Each user can access only their own tasks.

## Deployment

Deployment links will be added after deployment.

## Future Improvements

- Due dates
- Task sorting
- Dark mode
- Drag and drop
- Reminders