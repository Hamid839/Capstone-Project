const jwt = require("jsonwebtoken");

// Generates a signed JWT containing the user's ID.
// Expires based on JWT_EXPIRE in .env (defaults to 1 day).
function generateToken(userId) {
  const expiration = process.env.JWT_EXPIRE || "1d";
  
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: expiration,
  });
}

module.exports = generateToken;
