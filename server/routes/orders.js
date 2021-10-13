var express = require('express');
var router = express.Router();
var {getAllOrders,getDetailOrder} = require('../controllers/orders')


router.get('/', getAllOrders);
router.get('/:id', getDetailOrder);

module.exports = router;
