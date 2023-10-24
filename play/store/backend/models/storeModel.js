const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
  name: {
    type: String,
      required: [true, "Please add a name"],
  },
  location: {
    type: String,
      required: [true, "Please add a location"],
  },
  description: {
    type: String,
      required: [true, "Please add a description"],
  },
  tag: {
    type: String,
}
});

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
