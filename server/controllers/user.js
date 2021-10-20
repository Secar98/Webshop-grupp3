const UserModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secretToken = process.env.SECRET_TOKEN;
const salt = Number(process.env.SALT);

const generateToken = (user) => {
  return jwt.sign({ data: user }, secretToken, { expiresIn: "30m" });
};

const signupUser = async (req, res, next) => {
  const { fullName, password, email, phoneNumber, deliveryAddress } = req.body;

  const user = await UserModel.exists({ email });

  if (!user) {
    bcrypt.hash(password, salt, (error, hash) => {
      if (error) res.status(500);
      const newUser = new UserModel({
        fullName,
        password: hash,
        email,
        phoneNumber,
        deliveryAddress,
      });
      newUser
        .save()
        .then((user) => {
          res.status(201).json({ token: generateToken(user._id) });
        })
        .catch((err) => {
          res.status(400).json({ msg: err.message });
        });
    });
  } else {
    res.status(400).json({ msg: "Email already in use" });
  }
};

const signInUser = (req, res, next) => {
  const { email, password } = req.body;

  UserModel.findOne({ email }).exec((err, user) => {
    if (user) {
      bcrypt.compare(password, user.password, (error, match) => {
        if (error) res.status(500).json({ msg: error });
        else if (match)
          res.status(200).json({ token: generateToken(user._id) });
        else res.status(403).json({ msg: "wrong email or password" });
      });
    } else {
      res.status(403).json({ msg: "wrong email or password" });
    }
  });
};

const getUser = async (req, res, next) => {
  const id = req.user;
  try {
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const updateUser = (req, res, next) => {
  const id = req.user;
  const { fullName, email, phoneNumber, deliveryAddress } = req.body;
  try {
    UserModel.findByIdAndUpdate(
      id,
      {
        fullName,
        email,
        phoneNumber,
        deliveryAddress,
      },
      { returnOriginal: false }
    )
      .then((user) => {
        user.password = null;
        res.status(200).json({ user });
      })
      .catch((err) => res.status(500).json({ msg: err.message }));
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports = { signupUser, signInUser, getUser, updateUser };
