const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const validateObjectId = require("../middleware/validateObjectId");

router.get("/", getAllStudents);
router.get("/:id", validateObjectId, getStudentById);
router.post("/", createStudent);
router.put("/:id", validateObjectId, updateStudent);
router.delete("/:id", validateObjectId, deleteStudent);

module.exports = router;
