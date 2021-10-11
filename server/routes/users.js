const express = require("express");
const router = express.Router();
const UsersModel = require("../models/UsersModel");

const OrdersModel = require("../models/OrdersModel");

/* GET users listing. */
router.get("/", function (req, res, next) {
  const order = new OrdersModel({
    user: "6164707600930933d55f9296",
    products: [
      {
        product: "616476a066f9d18e67689c51",
        amount: 20,
      },
    ],
    shipping: 25,
    totalPrice: 25,
    deliveryAdress: {
      postalCode: 12345,
      streetAdress: "test",
      city: "test",
    },
    status: "test",
  });

  order.save();

  res.send("respond with a resource");
});

module.exports = router;
