const express = require("express");
const { signup, login, getMe } = require("../controllers/authController.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware for protected route
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);

module.exports = router;
