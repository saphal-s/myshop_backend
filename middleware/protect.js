const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.protect = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders.split("Bearer ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized User" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized User" });
  }
};

exports.checkAdmin = async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  const token = authHeaders.split("Bearer ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      if (req.user.role === "admin") {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized User" });
      }
    } catch (error) {
      res.status(401).json({ message: "Unauthorized User" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized User" });
  }
};
