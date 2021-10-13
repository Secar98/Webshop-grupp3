const Orders = require("../models/OrdersModel");

const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Orders.find();
        res.status(200).json(allOrders);
    } catch (err) {
        res.status(404).json({ massage: err.message });
    }
};

const getDetailOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const order = await Orders.findById(id);
        res.status(200).json(order);
    } catch (err) {
        res.status(404).json({ massage: err.message });
    }
};

const addOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const order = await Orders.findById(id);
        res.status(200).json(order);
    } catch (err) {
        res.status(404).json({ massage: err.message });
    }
};


module.exports = {
    getAllOrders,
    getDetailOrder
};