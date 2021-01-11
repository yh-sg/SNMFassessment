require('dotenv').config();
const jwt = require("jsonwebtoken");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

module.exports = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({
      message: "No Authorize",
    });
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);

    req.user = decoded.user;
    
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Not Valid!",
    });
  }
};