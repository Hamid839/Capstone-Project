// Centralized error handler.
// Converts common Mongoose errors into clean, predictable JSON responses
// with the correct HTTP status codes.
function errorHandler(err, req, res, next) {
  // Mongoose validation error (e.g., missing required field, bad enum)
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors,
    });
  }

  // Invalid ObjectId format passed to a Mongoose query
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid value for field "${err.path}": ${err.value}`,
    });
  }

  // Duplicate key error (e.g., email must be unique)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `A student with this ${field} already exists.`,
    });
  }

  // Malformed JSON in the request body
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON in request body.",
    });
  }

  // Fallback: unexpected server error
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong on the server.",
  });
}

module.exports = errorHandler;
