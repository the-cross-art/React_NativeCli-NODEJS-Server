const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const tweetSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    tweet_name: {
      type: String,
      required: "tweet name is required",
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },
    tweet: {
      type: String,
    },
  },
  { timestamps: true }
);

// tweetSchema.index({ user: 1, league_name: 1 }, { unique: true });

module.exports = mongoose.model("Tweet", tweetSchema);
