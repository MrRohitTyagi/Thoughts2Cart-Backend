const Order = require("../modals/OrderModal");
const product = require("../modals/ProductModal");

exports.newOrder = async (req, res) => {
  try {
    const { userDetails, items, paymentID, paymentStatus } = req.body;
    let obj = {
      shippingInfo: {
        address: userDetails.address.address,
        city: userDetails.address.district,
        state: userDetails.address.state,
        country: userDetails.address.country,
        phoneNo: userDetails.phone,
      },
      orderItems: items.map((ele) => {
        return {
          id: ele._id,
          name: ele.description,
          price: ele.price,
          quantity: ele.count,
          image: ele.images,
        };
      }),
      user: userDetails._id,
      user_email: userDetails.email,
      paymentInfo: {
        id: paymentID,
        status: paymentStatus ? "success" : "Failed",
      },
      deliveredAt: 3,
    };

    //   res.status(200).send("dasdasda");
    //  return;
    const newOrder = await Order.create(obj);
    res.status(200).json({
      success: true,
      response: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Something went wrong",
    });
  }
};

exports.getAllUserorders = async (req, res) => {
  const { data = [] } = req.query;
  try {
    let alldata = data.map((ele) => {
      return Order.findById(ele);
    });
    let allOrders = [];
    (await Promise.all(alldata)).map((ele) => {
      if (ele) {
        allOrders.push(ele);
      }
    });

    res.status(200).json({
      success: true,
      response: allOrders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Something went wrong",
    });
  }
};
exports.getAllorders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      success: true,
      response: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Something went wrong",
    });
  }
};
