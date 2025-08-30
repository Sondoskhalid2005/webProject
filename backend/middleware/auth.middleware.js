const jwt = require("jsonwebtoken");
const mongoose=require("mongoose")

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   req.user = decoded;
   req.user.id=new mongoose.Types.ObjectId(req.user.id)
   
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = {authMiddleware};
