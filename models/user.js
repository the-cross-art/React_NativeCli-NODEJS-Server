const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim: true
    },
    lname: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    hashPassword: {
      type: String,
      required: true,
      trim: true,
    },
    followers: [{
      type: ObjectId,
      ref: 'User'
    }],
    following: [{
      type: ObjectId,
      ref: 'User'
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
