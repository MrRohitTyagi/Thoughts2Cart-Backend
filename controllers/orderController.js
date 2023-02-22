const Order = require("../modals/OrderModal");
const product = require("../modals/ProductModal");

exports.newOrder = async (req, res) => {
  const {
  } = req.body;

  // res.status(200).send("dasdasda");
  // return;
  const NewOrder = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    NewOrder,
  });
};
