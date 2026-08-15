require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/students");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB("mongodb://localhost:27017/student-management");

// Parse incoming JSON request bodies
app.use(express.json());

// Root route — simple health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management REST API (MongoDB + Mongoose) is running 🚀",
    endpoints: {
      getAll: "GET /students",
      getOne: "GET /students/:id",
      create: "POST /students",
      update: "PUT /students/:id",
      delete: "DELETE /students/:id",
    },
  });
});

// Student CRUD routes
app.use("/students", studentRoutes);

// 404 handler — for any route that doesn't match
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

// Centralized error handler (must be registered last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on mongodb://localhost:27017/student-management`);
});
