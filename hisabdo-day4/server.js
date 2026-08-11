const express = require("express");
const studentsRouter = require("./routes/students");

const app = express();
const PORT = process.env.PORT || 5000;

// Parse incoming JSON request bodies
app.use(express.json());

// Root route — simple welcome/health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management REST API is running 🚀",
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
app.use("/students", studentsRouter);

// ---------------------------------------------------------
// 404 handler — for any route that doesn't match
// ---------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

// ---------------------------------------------------------
// Handle malformed JSON in request bodies
// ---------------------------------------------------------
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON in request body.",
    });
  }
  next(err);
});

// ---------------------------------------------------------
// Global error handler — catches any unexpected errors
// ---------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong on the server.",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
