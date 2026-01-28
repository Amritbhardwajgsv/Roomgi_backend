const jwt = require("jsonwebtoken");

const validate = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Authentication required"
      });
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded;
    next(); 
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};
module.exports = validate;
