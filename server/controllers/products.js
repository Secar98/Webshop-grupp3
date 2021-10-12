var express = require('express');

const getAllProducts = (req, res) => {
    res.json({text: "hello2"})
}

module.exports = {getAllProducts};