const express = require("express");
const router = express.Router();
const { signupUser, signInUser, getUser } = require("../controllers/user");
const {verify} = require("../utils/auth")

/* GET users listing. */
router.post("/signup", signupUser);
router.post("/signin", signInUser );
router.get("/", verify, getUser); 

module.exports = router;
