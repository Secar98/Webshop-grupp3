const express = require("express");
const router = express.Router();
const {
  signupUser,
  signInUser,
  getUser,
  updateUser,
} = require("../controllers/user");

const { verify } = require("../utils/auth");

router.post("/signup", signupUser);
router.post("/signin", signInUser);
router.get("/", verify, getUser);
router.post("/", verify, updateUser);

module.exports = router;
