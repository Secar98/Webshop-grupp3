const Orders = require("../models/OrdersModel");
const User = require("../models/UsersModel");
const Products = require("../models/ProductsModel");

const getAllOrders = async (req, res) => {
    const id = req.user;
    try {
        const allOrders = await Orders.find({ user: id }).populate('products.product');
        res.status(200).json(allOrders);
    } catch (err) {
        res.status(404).json({ message: err.message });
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
    const { products } = req.body
    const user = req.user

    if (products.length > 0) {
        const futureProduct = products.map((x) => {
            return {
                "amount": x.amount,
                "product": x.id,
            }
        })

        const newProduct = []
        products.map(item => newProduct.push(item.id))
        const userData = await User.findById(user)

        const productsData = await Products.find({ '_id': { $in: newProduct } })
        const shipping = 50;
        let total = shipping;
        products.map(item => {
            const current = productsData.find(product => item.id == product._id)
            total += current.price * item.amount
        })
        const { deliveryAddress } = userData
        const status = "not send";

        let newObj = { products: futureProduct, shipping, totalPrice: total, deliveryAddress, status, user }
        const newOrder = await new Orders(newObj);
        newOrder.save()
            .then((order) => {

                res.status(201).json(order);
            }).catch((err) => {
                res.status(400).json({ msg: err.message });
            });
    }
    else res.sendStatus(404)
}


module.exports = {
    getAllOrders,
    getDetailOrder,
    addOrder,
};