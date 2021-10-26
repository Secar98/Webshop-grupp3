const express = require('express');
const router = express.Router();
const {getCart} = require('../controllers/checkout');

router.post('/', getCart);

module.exports = router;