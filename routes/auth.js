const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");
const { validateUser } = require("../middlewares/joi");

// controllers
const { register, login, home } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/home", home);

module.exports = router;
