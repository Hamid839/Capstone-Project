// Basic validation middleware for student create/update requests.

function validateStudent(req, res, next) {
  const { name, email, course, marks } = req.body;
  const errors = [];

  if (!name || typeof name !== "string" || !name.trim()) {
    errors.push("name is required and must be a non-empty string.");
  }

  if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("email is required and must be a valid email address.");
  }

  if (!course || typeof course !== "string" || !course.trim()) {
    errors.push("course is required and must be a non-empty string.");
  }

  if (marks === undefined || marks === null || marks === "") {
    errors.push("marks is required.");
  } else if (typeof marks !== "number" || Number.isNaN(marks)) {
    errors.push("marks must be a number.");
  } else if (marks < 0 || marks > 100) {
    errors.push("marks must be between 0 and 100.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors,
    });
  }

  next();
}

// Validates that :id in the URL is a positive integer.
function validateIdParam(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: `Invalid id "${req.params.id}". ID must be a positive integer.`,
    });
  }

  req.studentId = id;
  next();
}

module.exports = { validateStudent, validateIdParam };
