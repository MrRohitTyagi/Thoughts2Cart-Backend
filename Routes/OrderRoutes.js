const express = require("express");
const router = express.Router();

const {
  newOrder,
  getAllUserorders,
  getAllorders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.route("/new").post(newOrder);

router.route("/get-user-orders").get(getAllUserorders);

router.route("/get-all-orders").get(getAllorders);

router.route("/update-order").post(updateOrder);

router.route("/delete-order").delete(deleteOrder);

module.exports = router;
