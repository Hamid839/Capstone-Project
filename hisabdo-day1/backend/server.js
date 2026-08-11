// server.js
// A very basic Express.js server for Day 1 of the HisabDo MERN Internship

const express = require("express");
const app = express();
const PORT = 5000;

// A simple route that returns a welcome message
app.get("/", (req, res) => {
  res.send("Hello! This is my basic Express.js server for Day 1 🚀");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
