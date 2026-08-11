# HisabDo Internship Bootcamp — Day 1 (MERN Track)

## 📚 What I Learned

- **MERN Stack**: MongoDB, Express.js, React.js, and Node.js — a set of
  technologies used together to build full-stack JavaScript web apps.
- **MongoDB**: A NoSQL database that stores data as flexible, JSON-like
  documents instead of rows and tables.
- **Express.js**: A lightweight web framework for Node.js used to build
  servers and APIs.
- **React.js**: A JavaScript library for building user interfaces out of
  reusable components.
- **Node.js**: A JavaScript runtime that lets JavaScript run outside the
  browser (e.g., on a server).
- **Frontend vs Backend**: The frontend is what the user sees and interacts
  with (UI); the backend handles logic, data, and server-side operations.
- **Database**: A system for storing and organizing data so it can be
  retrieved and updated easily.
- **Basic JavaScript concepts**: variables, functions, arrays/objects, and
  ES6+ features like arrow functions and destructuring.
- **npm**: Node Package Manager — used to install and manage JavaScript
  packages/libraries.
- **Git & GitHub**: Git is a version control tool to track code changes;
  GitHub is a platform to host and share Git repositories.

## 💻 What I Built

This repository contains two small, separate projects:

### 1. `backend/` — Basic Express.js Server
A minimal Node.js + Express server with a single route (`/`) that returns a
welcome message.

**Run it:**
```bash
cd backend
npm install
npm start
```
Then visit `http://localhost:5000` in your browser.

### 2. `frontend/` — Basic React App
A simple React app (created with Vite) containing:
- A heading
- A short paragraph of text
- A button with a click interaction (`useState`)

**Run it:**
```bash
cd frontend
npm install
npm run dev
```
Then open the local URL shown in the terminal (usually `http://localhost:5173`).

## 📁 Project Structure
```
hisabdo-day1/
├── backend/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## ✅ Day 1 Checklist
- [x] Set up development environment
- [x] Installed and verified Node.js / npm
- [x] Created a basic Node.js project
- [x] Created a basic React project
- [x] Built a simple React page (heading, text, button)
- [x] Ran the React app successfully
- [x] Created a basic Express.js server
- [x] Understood the basic project structure

No advanced CRUD, authentication, or database integration was done today —
per Day 1 instructions, this was purely about environment setup and basics.
