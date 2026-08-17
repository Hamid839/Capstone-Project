const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const protect = require("../middleware/authMiddleware");
const validateObjectId = require("../middleware/validateObjectId");

// Every student route requires a valid JWT (applied via router.use)
router.use(protect);

router.get("/", getAllStudents);
router.get("/:id", validateObjectId, getStudentById);
router.post("/", createStudent);
router.put("/:id", validateObjectId, updateStudent);
router.delete("/:id", validateObjectId, deleteStudent);

module.exports = router;
