const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const app = express();
app.use(express.json());
app.use(cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));
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
const { deleteImage } = require("./controllers/imageController");
const { paymentProcessor } = require("./controllers/paymentController");

app.use("/api/v1/products", product);

app.use("/api/v1/user", user);

app.use("/api/v1/order", order);

app.use("/api/v1/category", category);

//schemaless models
app.get("/", (req, res) => {
  res.send({ msg: "Hello All" });
});
// admin settings routes
app.post("/api/v1/save-siteSettings", saveAdminSetings);
app.get("/api/v1/get-siteSettings/:id", getAllAdminSettings);

// image CRUD  Routes
app.delete("/api/v1/delete-image/", deleteImage);

app.post("/api/v1/payment/payment-session/", paymentProcessor);

module.exports = app;
