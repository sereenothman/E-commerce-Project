// Authentication middleware to check if user is logged in
const jwt=require("jsonwebtoken")
function authenticate(req, res, next) {
    const token = req.session.token;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
  }
  module.exports=authenticate