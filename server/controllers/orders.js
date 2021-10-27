const Orders = require("../models/OrdersModel");
const User = require("../models/UsersModel");
const Products = require("../models/ProductsModel");

const getAllOrders = async (req, res) => {
    const id = req.user;
    try {
        const allOrders = await Orders.find({user:id}).populate('products.product');
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
    const {products, totalSum} = req.body
    const futureProduct = products.map(function(x) {
        return {    
            "amount": x[1],
            "product": x[0],
        }
    })
    

    const user = req.user
    const newProduct = []
    products.map(item => newProduct.push(item[0]))
    const userData = await User.findById(user)
    
    const productsData = await Products.find({ '_id': { $in: newProduct }})
    const shipping = 50; 

    let total = shipping; 
    products.map(item =>{
    
        const current = productsData.find(product => item[0] == product._id)
        total += current.price* item[1]
    })
    const {deliveryAddress} = userData
    const status = "not send";

    let newObj = {products: futureProduct, shipping, totalPrice: total, deliveryAddress, status, user}

    const newOrder = await new Orders (newObj);
    console.log(futureProduct)
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