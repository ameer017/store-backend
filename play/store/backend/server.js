require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const errorHandler = require("./middleware/errMiddleware");
const storeRoute = require("./routes/storeRoute");
const productRoute = require("./routes/productRoute");
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "*"],

    credentials: true,

    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use("/api/store-info", storeRoute);
app.use("/api/product-info", productRoute);

app.get("/", (req, res) => {
  res.send("Home Page");
});

// error page routes/ catch all routes
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ err: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Error Handler
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Store running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
