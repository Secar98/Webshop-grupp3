const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  pictures: {
    picture1: {
      type: String,
      required: true,
    },
    picture2: {
      type: String,
    },
    picture3: {
      type: String,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: [{ type: String, required: true }],
  weight: {
    type: Number,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
