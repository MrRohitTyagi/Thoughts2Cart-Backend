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

router.route("/products").get(getAllProducts);

router.route("/products/new").post(createProduct);

router.route("/products/update/:id").put(updateProduct);

router.route("/products/delete/").delete(deleteProduct);

router.route("/products/GetDetails/:id").get(getProductDetails);

router.route("/products/globalSearch").get(globalSearch);

router.route("/products/FilterData").get(FilterData);

module.exports = router;
