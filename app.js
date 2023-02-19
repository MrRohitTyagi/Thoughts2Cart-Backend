const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());

//routes import
const product = require("./Routes/productRoute.js");
const user = require("./Routes/userroutes");
const order = require("./Routes/OrderRoutes");
const category = require("./Routes/categoryRoutes");

const {
  getAllAdminSettings,
  saveAdminSetings,
} = require("./controllers/settingsController");

app.use("/api/v1", product);

app.use("/api/v1/user", user);

app.use("/api/v1/order", order);

app.use("/api/v1/category", category);

//schemaless models
app.get("/", (req, res) => {
  res.send({ msg: "Hello All" });
});
app.post("/api/v1/save-siteSettings", saveAdminSetings);
app.get("/api/v1/get-siteSettings/:id", getAllAdminSettings);

module.exports = app;
