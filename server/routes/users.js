const express = require("express");
const router = express.Router();
const { verify } = require("../utils/auth");
const {
  signupUser,
  signInUser,
  getUser,
  updateUser,
  validateJWT
} = require("../controllers/user");

router.post("/signup", signupUser);
router.post("/signin", signInUser);
router.get("/", verify, getUser);
router.post("/:id", verify, updateUser);
router.get("/jwt-valid", verify, validateJWT)

module.exports = router;
