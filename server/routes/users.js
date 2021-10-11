const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");

const ProductModel = require("../models/ProductsModel");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
