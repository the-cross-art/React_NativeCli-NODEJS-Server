const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const {
    myProfile,
    SearchUser,
    userSuggestions,
    uploadProfilePic,
    updateInterests
} = require("../controllers/User");

router.get("/my/profile", authCheck, myProfile);
router.get("/search/user/profile", SearchUser);
router.get("/profile/sugesstions/:value", userSuggestions);
router.post("/:id/upload/profile", authCheck, uploadProfilePic);
router.post("/:id/update/interests", authCheck, updateInterests);

module.exports = router;