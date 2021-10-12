const UserModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const tokenSecret = process.env.SECRET_TOKEN;
const salt = Number(process.env.SALT);

const signupUser = async (req, res, next) => {
  const { fullName, password, email, phoneNumber, deliveryAdress } = req.body;

  const user = await UserModel.exists({ email });

  if (!user) {
    bcrypt.hash(password, salt, (error, hash) => {
      if (error) res.status(500);
      const newUser = new UserModel({
        fullName,
        password: hash,
        email,
        phoneNumber,
        deliveryAdress,
      });
      newUser
        .save()
        .then((user) => {
          res.status(201).json({ user: user });
        })
        .catch((err) => {
          res.status(400).json({ msg: err.message });
        });
    });
  } else {
    res.status(400).json({ msg: "Email already in use" });
  }
};

module.exports = { signupUser };
