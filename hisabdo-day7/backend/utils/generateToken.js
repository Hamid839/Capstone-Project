const jwt = require("jsonwebtoken");

// Generates a signed JWT containing the user's ID.
// Expires based on JWT_EXPIRE in .env (defaults to 1 day).
function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "1d",
  });
}

module.exports = generateToken;
