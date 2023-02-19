const express = require("express");
const {
  getAllProducts,
  createProduct,
  FilterData,
  updateProduct,
  globalSearch,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");
const router = express.Router();

router.route("/all").get(getAllProducts);

router.route("/new").post(createProduct);

router.route("/update/:id").put(updateProduct);

router.route("/delete/").delete(deleteProduct);

router.route("/GetDetails/:id").get(getProductDetails);

router.route("/globalSearch").get(globalSearch);

router.route("/FilterData").get(FilterData);

module.exports = router;
