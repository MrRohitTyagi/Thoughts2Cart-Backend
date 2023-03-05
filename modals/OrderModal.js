const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: Array,
        default: [],
        required: true,
      },
      id: String,
    },
  ],
  user: {
    type: String,
    required: true,
  },
  user_email: String,

  paymentInfo: {
    id: {
      type: String,
    },

    status: {
      type: String,
      required: true,
    },
  },

  orderStatus: {
    type: String,
    default: "Processing",
  },
  deliveredAt: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
