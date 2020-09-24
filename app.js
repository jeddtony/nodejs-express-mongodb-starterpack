const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");


const app = express();
dotenv.config();


const MONGODB_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@127.0.0.1:27017/${process.env.MONGO_DATABASE}`;



console.log(MONGODB_URI);
// process.exit();

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then((result) => {
    console.log("Connected to Database!");
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });