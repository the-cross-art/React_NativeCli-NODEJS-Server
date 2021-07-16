const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  console.log("recieved");
  const { email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });
    if (existUser) return res.status(403).json("User already exists");
    const salt = await bcrypt.genSalt(10);
    // let newPassword = password.toString();
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);
    req.body.hashPassword = hash;
    const newUser = await new User(req.body).save();
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
    res.json({ newUser, token });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) res.status(404).json("User already exists");
    else res.status(404).json("Please fill all the manditory fields");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json("User not found");
    const verify = await bcrypt.compare(password, user.hashPassword);
    if (!verify) return res.status(404).json("Invalid password");
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.json({ user, token });
  } catch (error) {
    res.status(404).json("User not found");
  }
};

exports.tweets = async (req, res) => {
  try {
    console.log("trying to find");
    const tweets = await Tweet.find({}).sort({ createdAt: -1 }).exec();
    if (tweets) {
      console.log(tweets);
      res.json(tweets);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("No tweets found");
  }
};
