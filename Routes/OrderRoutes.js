const express = require("express");
const router = express.Router();

const { newOrder,getAllUserorders } = require("../controllers/orderController");

router.route("/new").post(newOrder);
router.route("/get-user-orders").get(getAllUserorders);

module.exports = router;
