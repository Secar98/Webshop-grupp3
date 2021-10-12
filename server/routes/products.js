var express = require('express');
var router = express.Router();
var {getAllProducts} = require('../controllers/products');

/* GET home page. */
router.get('/', getAllProducts);

module.exports = router;
