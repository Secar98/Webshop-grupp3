const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  deliveryAdress: {
    postalCode: Number,
    streetAdress: String,
    city: String,
    required: true,
  },
});
