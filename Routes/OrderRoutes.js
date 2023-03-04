const express = require("express");
const router = express.Router();

const {
  newOrder,
  getAllUserorders,
  getAllorders,
} = require("../controllers/orderController");

router.route("/new").post(newOrder);

router.route("/get-user-orders").get(getAllUserorders);

router.route("/get-all-orders").get(getAllorders);

module.exports = router;
