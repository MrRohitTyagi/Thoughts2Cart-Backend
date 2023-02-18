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
    default:
      "https://res.cloudinary.com/derplm8c6/image/upload/v1676731190/pngaaa.com-1887013_jsvtwg.png",
  },
  subCategory: {
    type: Array,
  },
});

module.exports = mongoose.model("category", UserSchema);
