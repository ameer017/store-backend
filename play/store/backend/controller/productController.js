const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const crypto = require("crypto");
const Store = require("../models/storeModel");

const addProduct = asyncHandler(async (req, res) => {
  const { productName, price, quality, storeTag, image } = req.body;

  // Function to generate a random unique ID for a store or product
  function generateRandomId(length = 4) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let productId = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      productId += characters.charAt(randomIndex);
    }
    return productId;
  }

  // Generate a random ID for a product
  const productId = generateRandomId();
  console.log("Product ID:", productId);

  const tag = productId;

  if (!productName || !price || !storeTag) {
    res.status(400);
    throw new Error("Please fill in all the required fields.");
  }

  const store = await Store.findById(storeTag).exec();
  if (!store) {
    res.status(404);
    throw new Error("Store not found");
  }

  //   Create new product
  const product = await Product.create({
    productName,
    price,
    quality,
    tag,
    storeTag,
    image
  });

  if (product) {
    const { _id, productName, price, quality, tag, storeTag, image } = product;

    res.status(201).json({
      _id,
      productName,
      price,
      quality,
      tag,
      storeTag,
      image
    });
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
});

const getProduct = asyncHandler(async (req, res) => {
  //   res.send("get product");

  const product = await Product.findOne(req.tag);

  if (product) {
    const { _id, productName, price, quality, tag, image } = product;

    res.status(201).json({
      _id,
      productName,
      price,
      quality,
      tag,
      image
    });
  } else {
    res.status(400);
    throw new Error("Product not found");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  //   res.send("update product");

  const product = await Product.findOne(req.tag);

  if (product) {
    const { _id, productName, price, quality, tag, storeTag, image} = product;

    product.tag = tag;
    product.storeTag = storeTag;
    product.productName = req.body.productName || productName;
    product.price = req.body.price || price;
    product.quality = req.body.quality || quality;

    const updatedProduct = await product.save();

    res.status(200).json({
      _id: updatedProduct._id,
      productName: updatedProduct.productName,
      quality: updatedProduct.quality,
      price: updatedProduct.price,
      tag: updatedProduct.tag,
      image: updatedProduct.image,
      storeTag: updatedProduct.storeTag,
    });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

const upgradeProduct = asyncHandler(async (req, res) => {
  res.send("update store");
});

const getProducts = asyncHandler(async (req, res) => {
  //   res.send("get products");

  const products = await Product.find().sort("-createdAt");
  if (!products) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.status(200).json(products);
});

const deleteProduct = asyncHandler(async (req, res) => {
  //   res.send("delete product");

  const product = Product.findOne(req.tag);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();
  res.status(200).json({
    message: "Product deleted successfully",
  });
});

module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  upgradeProduct,
  getProducts,
  deleteProduct,
};
