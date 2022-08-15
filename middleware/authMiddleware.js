const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  try {
    let { token } = req.cookies;

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Access Denied : Please log in first to access this route',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {}
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(403).json({
          success: false,
          message: `Role: ${req.user.role} is not allowed to access this resource`,
        })
      );
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };
