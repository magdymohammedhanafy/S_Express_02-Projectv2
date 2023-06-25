const jwt = require("jsonwebtoken");
const  verifyToken =(req, res, next) => {
    const [_, token] = req.headers.authorization?.split(" ");
    try {
      const [_, token] = req.headers.authorization?.split(" ");
      const decoded =  jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ status: "error", message: "Unauthenticated" });
    }
  };
  module.exports=verifyToken;
 