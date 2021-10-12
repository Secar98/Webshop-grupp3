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

const getDetailProduct = async (req, res) => {
    const id = req.params.id
    try {
        const product = await Products.findById(id)
        res.status(200).json(product)
    }
    catch (err) {
        res.status(404).json({message: err.message})
    }
}

module.exports = {
                    getAllProducts,
                    getDetailProduct
                };