const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const {
  register,
  login,
} = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
