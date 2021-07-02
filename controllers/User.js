const User = require("../models/user");

exports.myProfile = async (req, res) => {
    try {
        const foundUser = await User.findById(req.user).exec()
        res.json(foundUser)
    } catch (error) {
        console.log(error)
        res.status(404).json("User not found");
    }
};

exports.userSuggestions = async (req, res) => {
    try {
        const { value } = req.params;
        const foundUsers = await User.find({ "username": { "$regex": value, "$options": "i" } }).exec()
        let toSendArray = []
        foundUsers.map(each => {
            const { username, email } = each
            console.log(each)
            toSendArray.push({ username, email })
        })
        res.send(toSendArray)
    } catch (error) {
        console.log(error)
        res.status(404).json("User not found");
    }
};

exports.SearchUser = async (req, res) => {
    try {
        var name = 'Peter';
        model.findOne({ name: new RegExp('^' + name + '$', "i") }, function (err, doc) {
            //Do your action here..
        });
    } catch (error) {
        console.log(error)
        res.status(404).json("User not found");
    }
};