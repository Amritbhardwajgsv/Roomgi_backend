const jwt = require("jsonwebtoken");

const validate = (req, res, next) => {
  try {
    const token =
   req.cookies.token ||
   req.headers.authorization?.split(" ")[1];
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
      message: "Ivalid Token or User doesn't exist"
    });
  }
};
module.exports = validate;
