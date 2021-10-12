var express = require('express');
var Products = require('../models/ProductsModel');

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Products.find()
        res.status(200).json(allProducts)
    }
    catch (err) {
        res.status(404).json({message: err.message})
    }
}

module.exports = {getAllProducts};