const express = require("express");
const router = express.Router();

// route middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const {
  create,
  read,
  update,
  remove,
  list,
  getAll,
  //   getCount,
  //   listPerPage,
  //   listTeams,
} = require("../controllers/tweets");

// routes
router.post("/tweets/new", create);
router.get("/:u_id/tweets", list);
router.get("/tweets/all", getAll);

router.get("/tweets/:id", read);
router.put("/tweets/:id", authCheck, update);
router.delete("/tweets/:id", authCheck, remove);

module.exports = router;
