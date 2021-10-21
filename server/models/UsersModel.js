const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    type: String,
    required: true,
  },
  deliveryAddress: {
    postalCode: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
  },
});

module.exports = mongoose.model("User", userSchema);
