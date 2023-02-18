const express = require("express");

const router = express.Router();

const {
  createCategory,
  getAllcategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.route("/create-category").post(createCategory);

router.route("/delete-category").delete(deleteCategory);

router.route("/getAll-category").get(getAllcategory);

module.exports = router;
