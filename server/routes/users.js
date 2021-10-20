const express = require("express");
const router = express.Router();
const { verify } = require("../utils/auth");
const {
  signupUser,
  signInUser,
  getUser,
  updateUser,
} = require("../controllers/user");

router.post("/signup", signupUser);
router.post("/signin", signInUser);
router.get("/", verify, getUser);
router.post("/:id", verify, updateUser);

module.exports = router;
