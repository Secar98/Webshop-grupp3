var express = require('express');
var router = express.Router();
var {getAllProducts,getDetailProduct} = require('../controllers/products');

/* GET home page. */
router.get('/', getAllProducts);
router.get('/:id', getDetailProduct);

module.exports = router;
