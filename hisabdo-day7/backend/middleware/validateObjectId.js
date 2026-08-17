const mongoose = require("mongoose");

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
