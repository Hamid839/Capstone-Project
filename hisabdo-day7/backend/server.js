require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Allow the React frontend (running on a different port/origin) to call this API
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management API with JWT Authentication 🚀",
    endpoints: {
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
      me: "GET /api/auth/me (protected)",
      students: "GET/POST /api/students (protected)",
      studentById: "GET/PUT/DELETE /api/students/:id (protected)",
    },
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

// Centralized error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
