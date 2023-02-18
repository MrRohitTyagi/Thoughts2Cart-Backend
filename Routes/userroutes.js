const express = require("express");

const router = express.Router();

const {
  regesterUser,
  getUserDetails,
  deleteUser,
  getAllUsers,
  matchPasswords,
} = require("../controllers/userController");

router.route("/regester").post(regesterUser);

router.route("/getUserDetails/").get(getUserDetails);

router.route("/deleteUser/").delete(deleteUser);

router.route("/getAllUsers/").get(getAllUsers);

router.route("/matchPass").get(matchPasswords);

module.exports = router;
