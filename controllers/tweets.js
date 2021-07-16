const Tweet = require("../models/tweets");

exports.create = async (req, res) => {
  const { tweet_name, tweet, user } = req.body;
  try {
    const newTweet = await new Tweet({
      tweet_name,
      tweet,
      user,
    }).save();
    res.json(newTweet);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.list = async (req, res) => {
  const { u_id } = req.params;
  console.log(u_id);
  try {
    console.log("trying to find");
    const tweets = await Tweet.find({ user: u_id })
      .sort({ createdAt: -1 })
      .exec();
    if (tweets) {
      console.log(tweets);
      res.json(tweets);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("No tweets found");
  }
};

exports.getAll = async (req, res) => {
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

exports.remove = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const foundStocks = await Tweet.find({ Tweet: id }).exec();
  if (foundStocks && foundStocks.length > 0)
    res
      .status(400)
      .send("Cannot delete because active teams are available in this Tweet");
  else {
    const removedStock = await Tweet.findByIdAndDelete(id).exec();
    if (removedStock) res.json(removedStock);
    else res.status(400).send("Could not find the Tweet, delete failed");
  }
};

exports.read = async (req, res) => {
  const { id } = req.params;
  const Tweet = await Tweet.findById(id).exec();
  if (Tweet) {
    res.json(Tweet);
  } else {
    res.status(404).send("Tweet not found");
  }
};

exports.update = async (req, res) => {
  console.log();
  const { id } = req.params;
  try {
    const updatedStock = await Tweet.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();
    if (updatedStock) res.json(updatedStock);
    else res.status(400).send("Tweet not found");
  } catch (error) {
    console.log(error);
    res.status(400).send("Tweet update failed");
  }
};
