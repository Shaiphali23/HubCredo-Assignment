const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ============================ SIGNUP ============================
const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check existing user
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already registered" });

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    res.json({ message: "Signup successful!", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================ LOGIN ============================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: { name: user.name, email: user.email, phone: user.phone },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============================ ME (Protected Route) ============================
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login, getMe };
