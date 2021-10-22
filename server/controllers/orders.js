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
    const { products, shipping, totalPrice, deliveryAddress, status } = req.body
    const user = req.user

    const order = products.reduce((a, b) => ({amount: a.amount + b.amount}));

    const sum = order.amount += shipping;

    let newObj = {products, shipping, totalPrice, deliveryAddress, status, user}

    newObj = {...newObj, ["totalPrice"]: sum}

    const newOrder = await new Orders (newObj);
    newOrder.save()

    .then((order) => {

        res.status(201).json(order);
    }).catch((err) => {
        res.status(400).json({ msg: err.message });
      });
}


module.exports = {
    getAllOrders,
    getDetailOrder,
    addOrder,
};