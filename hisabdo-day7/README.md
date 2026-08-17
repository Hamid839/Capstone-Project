# HisabDo Internship Bootcamp — Day 7 (MERN Track)

## 📚 What I Learned & Practiced

- **Connecting React to a real backend**: replaced hardcoded/local state
  with live `fetch`/`axios` calls to an Express + MongoDB API.
- **API integration patterns**: a small `api/` layer (`axios.js`,
  `auth.js`, `students.js`) that keeps HTTP logic out of components.
- **Auth interceptors**: an axios request interceptor automatically attaches
  the JWT to every outgoing request; a response interceptor clears stored
  auth state on a `401`.
- **React Context for auth state**: `AuthContext` holds `user`/`token` in
  React state (so the UI re-renders correctly) while persisting the token
  in `localStorage` (so a page refresh doesn't log the user out).
- **Protected routing**: `ProtectedRoute` + `react-router-dom` redirect
  unauthenticated users to `/login` and only render the student management
  page once a session is confirmed.
- **Loading & error states**: every async action (fetch, add, update,
  delete, login, register) has its own loading/error handling, so the UI
  never silently fails or hangs without feedback.

## 💻 What I Built

A full-stack Student Management app:
- **Backend** (`backend/`) — Express + MongoDB + Mongoose + JWT auth
  (carried over from Day 5/6, with `cors` added so the frontend can call it)
- **Frontend** (`frontend/`) — React (Vite) app with login/register,
  a protected student management page, and full CRUD + search

### Features
1. ✅ Fetch students from the API on page load
2. ✅ Display students in a table
3. ✅ Add a student
4. ✅ Update (edit) a student
5. ✅ Delete a student
6. ✅ Search students by name (client-side filter over fetched data)
7. ✅ Loading state (spinner) while requests are in flight
8. ✅ Error messages (a dismissible banner) for failed requests
9. ✅ Login page
10. ✅ Register page
11. ✅ JWT stored in `localStorage`, attached automatically to API calls
12. ✅ Protected `/students` route — redirects to `/login` if not authenticated
13. ✅ Logout (clears token, redirects to login)

## 📁 Project Structure
```
hisabdo-day7/
├── backend/
│   ├── config/db.js
│   ├── controllers/           → authController, studentController
│   ├── middleware/            → authMiddleware, validateObjectId, errorHandler
│   ├── models/                → User.js, Student.js
│   ├── routes/                → auth.js, students.js
│   ├── utils/generateToken.js
│   ├── screenshots/           → bcrypt/JWT + schema validation test screenshots
│   ├── postman_collection.json
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/               → axios.js, auth.js, students.js
│   │   ├── context/AuthContext.jsx
│   │   ├── components/        → Navbar, ProtectedRoute, StudentForm,
│   │   │                         StudentTable, Spinner, ErrorBanner
│   │   ├── pages/              → LoginPage, RegisterPage, StudentsPage
│   │   ├── App.jsx, App.css, main.jsx
│   ├── screenshots/            → full user-flow screenshots (see below)
│   ├── vite.config.js           → dev proxy: /api → http://localhost:5000
│   └── package.json
└── README.md   (this file)
```

## ⚙️ Backend Setup & MongoDB Configuration

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=1d
```

- **Local MongoDB**: `mongodb://127.0.0.1:27017/hisabdo_students`
- **MongoDB Atlas**: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/hisabdo_students?retryWrites=true&w=majority`

Then run the backend:
```bash
npm start        # or: npm run dev (auto-restart with nodemon)
# Backend runs at http://localhost:5000
```

⚠️ **Never commit your real `.env`** — only `.env.example` (placeholders) is
committed; `.env` is gitignored.

## ⚙️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
# Frontend runs at http://localhost:5173
```

The frontend calls relative paths like `/api/students`. In development,
`vite.config.js` proxies any `/api/*` request to `http://localhost:5000`,
so **both servers need to be running** (backend on 5000, frontend on 5173)
for the app to work locally.

## ▶️ How to Run the Full Project

1. Start MongoDB (local service or confirm your Atlas cluster is reachable).
2. In one terminal: `cd backend && npm start`
3. In another terminal: `cd frontend && npm run dev`
4. Open `http://localhost:5173` in your browser.
5. Register a new account, or log in if you already have one.
6. You'll land on the protected Student Management page.

## 🔗 API Documentation

| Method | Endpoint             | Protected? | Description                  |
|--------|-----------------------|:----------:|-------------------------------|
| POST   | `/api/auth/register`  | ❌         | Register a new user           |
| POST   | `/api/auth/login`     | ❌         | Log in, receive a JWT         |
| GET    | `/api/auth/me`        | ✅         | Get current user's profile    |
| GET    | `/api/students`       | ✅         | Get all students              |
| GET    | `/api/students/:id`   | ✅         | Get a student by ID           |
| POST   | `/api/students`       | ✅         | Create a student               |
| PUT    | `/api/students/:id`   | ✅         | Update a student               |
| DELETE | `/api/students/:id`   | ✅         | Delete a student               |

Protected routes require: `Authorization: Bearer <token>`

### Sample: Register
**Request:** `POST /api/auth/register`
```json
{ "name": "Aisha Rahman", "email": "aisha@example.com", "password": "secret123" }
```
**Response `201`:**
```json
{
  "success": true,
  "message": "User registered successfully.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": { "id": "665f...", "name": "Aisha Rahman", "email": "aisha@example.com" }
}
```

### Sample: Get Students (protected)
**Request:** `GET /api/students`
**Header:** `Authorization: Bearer <token>`
**Response `200`:**
```json
{ "success": true, "count": 3, "data": [ { "_id": "...", "name": "...", "...": "..." } ] }
```

Full request/response examples for every endpoint (including error cases)
are in `backend/README.md`'s predecessor content and the Postman collection
at `backend/postman_collection.json` — import it directly into Postman.

## 🧪 Testing

**Backend auth logic (bcrypt + JWT + Mongoose schema validation)** was
tested directly and genuinely — no live database needed for that part.
See `backend/screenshots/bcrypt-jwt-test.png` and
`backend/screenshots/schema-validation-test.png`.

**The full frontend ↔ backend integration was tested end-to-end** using a
temporary local mock server that mirrors this backend's exact API shape
(same routes, same request/response format, same status codes) — this was
necessary because live MongoDB isn't reachable from the environment this
was built in. Using that mock, the following was verified with a real
browser driving the real frontend code:

- Visiting the app while logged out → redirected to `/login`
- Registering a new account → JWT stored, redirected to `/students`
- Students fetched and rendered from the API
- Adding a student → appears in the list immediately
- Editing a student → form pre-fills, update reflects in the table
- Deleting a student → removed from the list (with a confirm prompt)
- Searching by name → list filters correctly
- A duplicate-email submission → genuine `409` error shown in the error banner
- Wrong password on login → error banner shown
- A slow/in-flight request → loading spinner displays correctly
- The API being unreachable → a clear error message displays instead of a
  silent failure or crash

Screenshots of all of these real runs are in `frontend/screenshots/`.
Since this used a mock backend rather than a live MongoDB connection, it's
worth re-running these same checks against your real backend + database
once deployed, and swapping in fresh screenshots if you'd like — the app
code itself is identical either way, only the data source changes.

## ✅ Day 7 Checklist
- [x] React fetches students from the API
- [x] Students displayed in a table
- [x] Add / Update / Delete student (all wired to the API)
- [x] Search students by name
- [x] Loading state while requests are in flight
- [x] Error messages for failed requests
- [x] Login page
- [x] Register page
- [x] Auth state stored securely (JWT in localStorage + React Context)
- [x] Protected student-management route
- [x] Logout
- [x] `.env` files excluded from the repo (both frontend and backend)
- [x] Full flow tested end-to-end with a real browser
