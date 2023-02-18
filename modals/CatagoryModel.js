const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    maxLength: 30,
  },
  image: {
    type: String,
    require: true,
  },
  subCategory: {
    type: Array,
  },
});

module.exports = mongoose.model("category", UserSchema);
