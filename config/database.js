const mongoose = require('mongoose')

const connectDatabase = () => {

    mongoose.connect('mongodb+srv://ecommerce:11101999@cluster0.vqotrki.mongodb.net/Ecommerce').then((data) => {
        console.log(`MondoDB connected with server ${data.connection.host}`);
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = connectDatabase