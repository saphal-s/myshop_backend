const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
require("dotenv").config();

// route

const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const prodcutRoute = require("./routes/productRoute");
const bannerRoute = require("./routes/bannerRoute");

// app

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

// middlewre
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

// database connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db connected!"))
  .catch((error) => console.log("db connection error", error));

// user route

app.use("/api", userRoute);
app.use("/api", categoryRoute);
app.use("/api", prodcutRoute);
app.use("/api", bannerRoute);
app.use("/uploads/", express.static("uploads"));

// port

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}`));
