const Products = require("../models/ProductsModel");

//Hämta storedCart från localstorage

//loopa igenom array, för varje id sök i databasen
//pusha in i ny array namn, pris, antal och totalpris

const getCart = async (req, res) => {
  try {
    let storedCart = [
      {
        id: "616476a066f9d18e67689c51",
        amount: 2,
      },
    ]; //hämtas från localstorage

    let cart = [];

    for (i = 0; i < storedCart.length; i++) {
      const id = storedCart[i].id;
      const product = await Products.findById(id);
      let total = product.price * storedCart[i].amount;

      cart.push({
        title: product.title,
        price: product.price,
        amount: storedCart[i].amount,
        total: total,
      });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { getCart };
