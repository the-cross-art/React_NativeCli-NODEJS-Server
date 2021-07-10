const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const existUser = await User.findOne({
      $or: [
        { email: req.body.values.email },
        { username: req.body.values.username },
        { phone: req.body.values.phone },
      ],
    });
    if (existUser) return res.status(403).json("User already exists");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.values.hashPassword = hash;
    const newUser = await new User(req.body.values).save();
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
    res.json({ newUser, token });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) res.status(404).json("User already exists");
    else res.status(404).json("Please fill all the manditory fields");
  }
};

exports.login = async (req, res) => {
  try {
    const existUser = await User.findOne({
      $or: [
        { email: req.body.value },
        { username: req.body.value },
        { phone: req.body.value },
      ],
    });
    if (!existUser) return res.status(404).json("User not found");
    const verify = await bcrypt.compare(
      req.body.password,
      existUser.hashPassword
    );
    if (!verify) return res.status(404).json("Invalid password");
    const token = jwt.sign({ _id: existUser._id }, process.env.JWT_SECRET);
    res.json({ existUser, token });
  } catch (error) {
    res.status(404).json("User not found");
  }
};

exports.home = async (req, res) => {
  console.log("successsss!!!!");
  res.status(403).json("successsss!!!!");
};
