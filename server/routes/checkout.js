const express = require('express');
const router = express.Router();
const {getCart} = require('../controllers/checkout');

router.get('/', getCart);

module.exports = router;