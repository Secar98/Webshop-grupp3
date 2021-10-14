const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    requied: true,
  },
  products: [
    {
      amount: {
        type: Number,
        required: true,
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  shipping: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  deliveryAddress: {
    postalCode: { type: Number, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
