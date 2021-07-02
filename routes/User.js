const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const {
    myProfile,
    SearchUser,
    userSuggestions
} = require("../controllers/User");

router.get("/my/profile", authCheck, myProfile);
router.get("/search/user/profile", SearchUser);
router.get("/profile/sugesstions/:value", userSuggestions);

module.exports = router;