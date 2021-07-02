const User = require("../models/user");
var jwt = require('jsonwebtoken');

exports.authCheck = async (req, res, next) => {
  try {
    const token = req.header('auth-token')
    if (!token) return res.status(403).send("Access Deneid")
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Invalid or expired token")
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      error: "Admin Resource. Access Denied",
    });
  } else {
    next();
  }
};
