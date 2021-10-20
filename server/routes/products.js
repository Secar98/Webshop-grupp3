const express = require("express");
const router = express.Router();
const { getAllProducts, getDetailProduct, getCheckOutProducts } = require("../controllers/products");

router.get("/", getAllProducts);
router.get("/:id", getDetailProduct);

router.post("/checkout", getCheckOutProducts);

module.exports = router;
