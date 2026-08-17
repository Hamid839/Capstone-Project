const Student = require("../models/Student");

// @desc    Get all students
// @route   GET /api/students   (protected)
async function getAllStudents(req, res, next) {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (err) {
    next(err);
  }
}

// @desc    Get a single student by ID
// @route   GET /api/students/:id   (protected)
async function getStudentById(req, res, next) {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with id ${req.params.id} not found.`,
      });
    }

    res.status(200).json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
}

// @desc    Create a new student
// @route   POST /api/students   (protected)
async function createStudent(req, res, next) {
  try {
    const { name, email, course, marks } = req.body;
    const student = await Student.create({
      name,
      email,
      course,
      marks,
      createdBy: req.user._id, // from the auth middleware
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully.",
      data: student,
    });
  } catch (err) {
    next(err);
  }
}

// @desc    Update an existing student
// @route   PUT /api/students/:id   (protected)
async function updateStudent(req, res, next) {
  try {
    const { name, email, course, marks } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, course, marks },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with id ${req.params.id} not found.`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully.",
      data: student,
    });
  } catch (err) {
    next(err);
  }
}

// @desc    Delete a student
// @route   DELETE /api/students/:id   (protected)
async function deleteStudent(req, res, next) {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with id ${req.params.id} not found.`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully.",
      data: student,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
