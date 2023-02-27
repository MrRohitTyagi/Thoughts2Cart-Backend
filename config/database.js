const mongoose = require("mongoose");
console.log(process.env.MONGO_STRING);

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_STRING)
    .then((data) => {
      console.log(`MondoDB connected with server ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
