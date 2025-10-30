🧠 Task Management System (MERN Stack)

This project is a Task Management System built using the MERN stack (MongoDB, Express, React, Node.js).
Due to time constraints, the frontend part of the project is incomplete — however, the backend has been fully implemented and tested.

⚙️ Project Overview

The system allows users to:

Create, edit, delete, and view tasks.

Assign tasks to other users.

Track tasks created and assigned to specific users.

Manage authentication and authorization using JWT.

💻 Tech Stack

Backend:

Node.js

Express.js

MongoDB (Mongoose ODM)

JWT Authentication

Cookie-based session handling

MVC architecture

Frontend (in progress):

React.js

Axios for API requests

React Router for navigation

Tailwind CSS (planned for styling)

🚀 Features Implemented (Backend)

User authentication with JWT

Task CRUD operations

Middleware for token verification

Proper route structure using Express Router

MongoDB integration via Mongoose

🧩 API Routes
User Routes

POST /api/auth/register — Register a new user

POST /api/auth/login — Login and generate JWT

POST /api/auth/logout — Logout and clear cookie

Task Routes

GET /api/tasks — Get all tasks for a logged-in user

POST /api/tasks — Create a new task

GET /api/tasks/:id — Get a specific task

PATCH /api/tasks/:id — Edit an existing task

DELETE /api/tasks/:id — Delete a task

🔐 Authentication

All task routes are protected by a verifyToken middleware which ensures only authenticated users can access or modify tasks.

📚 Personal Projects

Here are my other personal projects:

💬 QuickChat — Real-time chat application with steganography

GitHub: https://github.com/anthonyanup21/quickchat.git

Live Demo: https://quickchat-frontend-0r7p.onrender.com

