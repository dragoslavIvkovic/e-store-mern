const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("There is no token attached to header");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized, please login again." });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
    if (!adminUser || adminUser.role !== "admin") {
      throw new Error("You are not authorized to perform this action.");
    }
    next();
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

module.exports = { authMiddleware, isAdmin };
