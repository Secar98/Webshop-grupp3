const express = require("express");
const router = express.Router();
const { signupUser } = require("../controllers/user");

/* GET users listing. */
router.post("/signup", signupUser);

module.exports = router;
