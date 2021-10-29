const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");

const app = express();

const corsOptions = {
  origin: 'https://my-app-client-webshop-grupp3.herokuapp.com/',
  optionsSuccessStatus: 200
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

const uri = process.env.DB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))

app.use("/api/users", cors(corsOptions), usersRouter);
app.use("/api/products", cors(corsOptions), productsRouter);
app.use("/api/orders", cors(corsOptions), ordersRouter);

module.exports = app;
