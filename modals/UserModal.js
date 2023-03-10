const mongoose = require("mongoose");
const validator = require("validator");
const becrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
  },
  role: {
    type: String,
    default: "user",
  },
  profile: String,
  address: {
    type: Object,
    default: {},
  },

  createdAT: {
    type: Date,
    default: Date.now,
  },
  wishlist: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await becrypt.hash(this.password, 10);
});

//JWT Token

module.exports = mongoose.model("user", UserSchema);
