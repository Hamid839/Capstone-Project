const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protects routes by requiring a valid JWT in the Authorization header.
// Format expected: "Authorization: Bearer <token>"
async function protect(req, res, next) {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the authenticated user (without password) to the request
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. User belonging to this token no longer exists.",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Token has expired.",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Not authorized. Invalid token.",
    });
  }
}

module.exports = protect;
