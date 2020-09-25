const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");
const bodyParser = require("body-parser");


const app = express();
dotenv.config();


const MONGODB_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@127.0.0.1:27017/${process.env.MONGO_DATABASE}`;

// Setup cors
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import Routes 
const userRoutes = require("./routes/userRoute");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

  app.use("/", userRoutes);

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