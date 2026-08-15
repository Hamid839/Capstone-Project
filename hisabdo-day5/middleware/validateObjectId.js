const mongoose = require("mongoose");

// Validates that :id in the URL is a properly formatted MongoDB ObjectId
// before the controller tries to query the database with it.
function validateObjectId(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: `Invalid id "${id}". It is not a valid MongoDB ObjectId.`,
    });
  }

  next();
}

module.exports = validateObjectId;
