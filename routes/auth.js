const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");
const { validateUser } = require("../middlewares/joi");

// controllers
const {
  register,
  login,
} = require("../controllers/auth");

router.post("/register", validateUser, register);
router.post("/login", login);

module.exports = router;
