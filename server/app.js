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

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const uri = process.env.DB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);

module.exports = app;
