const mongoose = require("mongoose");

let siteSettings = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("site-settings", siteSettings);
