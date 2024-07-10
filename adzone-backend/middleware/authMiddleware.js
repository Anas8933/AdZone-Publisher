const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ error: "access denied. No token provided" });
    }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.publisherId = decodedToken.publisherId; 
    next();
  } catch (err) {
    console.error('JWT verification error:', err.message);
    res.status(401).json({ status: 'error', message: 'Invalid token.' });
  }
};

module.exports = authenticateToken;
