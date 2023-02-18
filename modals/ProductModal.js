const mongoose = require("mongoose");

const productschems = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please enter product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
    maxLength: [8, "Price cannot exceed 8 character"],
  },
  rating: {
    type: Number,
    default: 0,
  },

  images: {
    type: Array,
    default: [
      "https://res.cloudinary.com/derplm8c6/image/upload/v1676731190/pngaaa.com-1887013_jsvtwg.png",
    ],
  },

  category: String,
  offers: String,
  discount: {
    type: Number,
    default: 0,
  },
  deliveryTime: {
    type: Number,
    default: 1,
  },
  warranty: {
    type: Number,
    default: 1,
  },

  stock: {
    type: Number,
    required: [true, "please enter product Stock"],
    maxLength: [4, "illegal length"],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },

  createdAT: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("product", productschems);
