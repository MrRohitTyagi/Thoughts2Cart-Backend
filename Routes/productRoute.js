const express = require("express");
const {
  getAllProducts,
  createProduct,
  FilterData,
  updateProduct,
  globalSearch,
  deleteProduct,
  getProductDetails,
  getCategorisedProducts,
  getProductsForHomepage
} = require("../controllers/productController");
const router = express.Router();

router.route("/all").get(getAllProducts);

router.route("/category/:name").get(getCategorisedProducts);

router.route("/new").post(createProduct);

router.route("/update/:id").put(updateProduct);

router.route("/delete/").delete(deleteProduct);

router.route("/GetDetails/:id").get(getProductDetails);

router.route("/globalSearch").get(globalSearch);

router.route("/FilterData").get(FilterData);

router.route("/home-page-products").get(getProductsForHomepage);

module.exports = router;
