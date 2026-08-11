const express = require("express");
const router = express.Router();
const { students, getNextId } = require("../data/students");
const { validateStudent, validateIdParam } = require("../middleware/validateStudent");

// ---------------------------------------------------------
// GET /students — get all students
// ---------------------------------------------------------
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

// ---------------------------------------------------------
// GET /students/:id — get a single student by ID
// ---------------------------------------------------------
router.get("/:id", validateIdParam, (req, res) => {
  const student = students.find((s) => s.id === req.studentId);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${req.studentId} not found.`,
    });
  }

  res.status(200).json({
    success: true,
    data: student,
  });
});

// ---------------------------------------------------------
// POST /students — create a new student
// ---------------------------------------------------------
router.post("/", validateStudent, (req, res) => {
  const { name, email, course, marks } = req.body;

  // Prevent duplicate emails
  const emailExists = students.some(
    (s) => s.email.toLowerCase() === email.toLowerCase()
  );
  if (emailExists) {
    return res.status(409).json({
      success: false,
      message: `A student with email "${email}" already exists.`,
    });
  }

  const newStudent = {
    id: getNextId(),
    name: name.trim(),
    email: email.trim(),
    course: course.trim(),
    marks,
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully.",
    data: newStudent,
  });
});

// ---------------------------------------------------------
// PUT /students/:id — update an existing student
// ---------------------------------------------------------
router.put("/:id", validateIdParam, validateStudent, (req, res) => {
  const student = students.find((s) => s.id === req.studentId);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${req.studentId} not found.`,
    });
  }

  const { name, email, course, marks } = req.body;

  // Prevent updating to an email that belongs to a different student
  const emailTaken = students.some(
    (s) => s.id !== req.studentId && s.email.toLowerCase() === email.toLowerCase()
  );
  if (emailTaken) {
    return res.status(409).json({
      success: false,
      message: `Another student already uses the email "${email}".`,
    });
  }

  student.name = name.trim();
  student.email = email.trim();
  student.course = course.trim();
  student.marks = marks;

  res.status(200).json({
    success: true,
    message: "Student updated successfully.",
    data: student,
  });
});

// ---------------------------------------------------------
// DELETE /students/:id — delete a student
// ---------------------------------------------------------
router.delete("/:id", validateIdParam, (req, res) => {
  const index = students.findIndex((s) => s.id === req.studentId);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with id ${req.studentId} not found.`,
    });
  }

  const [deletedStudent] = students.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Student deleted successfully.",
    data: deletedStudent,
  });
});

module.exports = router;
