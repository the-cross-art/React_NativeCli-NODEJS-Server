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
    profileImage: {
      type: String,
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
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    address: {
      fisrt_line: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
      },
      second_line: {
        type: String,
        trim: true,
        maxlength: 50,
      },
      city: {
        type: String,
        trim: true,
        required: true,
        maxlength: 15,
      },
      pincode: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 10,
      },
      country: {
        type: String,
        trim: true,
        required: true,
        maxlength: 15,
      },
    },
    interests: [{
      type: String,
      trim: true
    }],
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
    posts: [{
      category: {
        type: ObjectId,
        ref: 'Category'
      },
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
