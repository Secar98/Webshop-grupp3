const Products = require("../models/ProductsModel");

//Hämta storedCart från localstorage

//loopa igenom array, för varje id sök i databasen
//pusha in i ny array namn, pris, antal och totalpris

const getCart = async (req, res) => {
  const {products} = req.body

  try {  
    let cart = [];
    
    for (i = 0; i < products.length; i++) {
      const id = products[i][0];
      const product = await Products.findById(id);
      let total = product.price * products[i].amount;
      
      cart.push({
        title: product.title,
        price: product.price,
        amount: products[i].amount,
        total: total,
      });
    }
    console.log(cart)
    res.status(200).json(cart);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { getCart };
