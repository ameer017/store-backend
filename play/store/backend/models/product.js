const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
      required: [true, "Please add a product name"],
  },
  price: {
    type: String,
      required: [true, "Please add a price"],
  },
  quality: {
    type: String,
    default: "good",
  },
  tag: {
    type: String
  },
  storeTag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store', // Reference to the Store model
    required: true,
  },
  photo: {
    type: String,
    default: 'https://github.com/zinotrust/mern-auth-frontend/blob/master/src/assets/avatarr.png'
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
