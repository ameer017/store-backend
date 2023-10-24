const asyncHandler = require("express-async-handler");
const Store = require("../models/storeModel");
const crypto = require("crypto");

const addStore = asyncHandler(async (req, res) => {
  const { name, location, description } = req.body;

  // Function to generate a random unique ID
  function generateRandomId(length = 4) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let storeId = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      storeId += characters.charAt(randomIndex);
    }
    return storeId;
  }

  // Generate a random ID for a store using the 'generateRandomId' function
  const storeId = generateRandomId();
  console.log("Store ID:", storeId);
  let tag = storeId;

  if (!name || !location || !description) {
    res.status(400);
    throw new Error("Please fill in all the required fields.");
  }

  const storeExists = await Store.findOne({ tag });

  if (storeExists) {
    res.status(400);
    throw new Error("Store already exists.");
  }

  // Create a new store with the generated storeId
  const store = await Store.create({
    name,
    location,
    description,
    tag,
  });

  if (store) {
    const { _id, name, location, description, tag } = store;

    res.status(201).json({
      _id,
      name,
      location,
      description,
      tag,
    });
  } else {
    res.status(400);
    throw new Error("Invalid shop details");
  }
});

const getStore = asyncHandler(async (req, res) => {
  //   res.send("get store");

  const store = await Store.findOne(req.tag);

  if (store) {
    const { _id, name, location, description, tag } = store;

    res.status(201).json({
      _id,
      name,
      location,
      description,
      tag,
    });
  } else {
    res.status(404);
    throw new Error("Store not found");
  }
});

const updateStore = asyncHandler(async (req, res) => {
  //   res.send("update store");

  const store = await Store.findOne(req.tag);

  if (store) {
    const { _id, name, location, description, tag } = store;

    store.tag = tag;
    store.name = req.body.name || name;
    store.location = req.body.location || location;
    store.description = req.body.description || description;

    const updatedStore = await store.save();

    res.status(200).json({
      _id: updatedStore._id,
      name: updatedStore.name,
      location: updatedStore.location,
      description: updatedStore.description,
      tag: updatedStore.tag,
    });
  } else {
    res.status(404);
    throw new Error("store not found");
  }
});

const upgradeStore = asyncHandler(async (req, res) => {
  res.send("update store");
});

const getStores = asyncHandler(async (req, res) => {
  //   res.send("get stores");

  const stores = await Store.find().sort("-createdAt");
  if (!stores) {
    res.status(500);
    throw new Error("Something went wrong");
  }
  res.status(200).json(stores);
});

const deleteStore = asyncHandler(async (req, res) => {
  //   res.send("delete store");

  const store = Store.findOne(req.tag);

  if (!store) {
    res.status(404);
    throw new Error("Store not found");
  }

  await store.deleteOne();
  res.status(200).json({
    message: "Store deleted successfully",
  });
});

module.exports = {
  addStore,
  getStore,
  updateStore,
  upgradeStore,
  getStores,
  deleteStore,
};
