const express = require("express");
const router = express.Router();

const { newOrder } = require("../controllers/orderController");

router.route("/new").post(newOrder);

module.exports = router;
