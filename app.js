const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
const xss = require('xss-clean');


const mongoSanitize = require('express-mongo-sanitize');
const app = express();

const userRoutes = require("./routes/auth");
const enquiryRoutes = require("./routes/enquiry");

mongoose.set("useCreateIndex", true);
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_UN}:${process.env.DB_PW}@cluster0-hh5l0.mongodb.net/CRM?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection failed!");
  });
  
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss())



app.use("/api/v1/user", userRoutes);
app.use("/api/v1/enquiry", enquiryRoutes);


module.exports = app;
