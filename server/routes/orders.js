var express = require('express');
var router = express.Router();
var {getAllOrders,getDetailOrder, addOrder} = require('../controllers/orders')
var {verify} = require('../utils/auth') 



router.get('/', verify, getAllOrders);
router.get('/:id', verify, getDetailOrder);

router.post('/', verify, addOrder);

module.exports = router;
