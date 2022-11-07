const mongoose = require('mongoose')

const uri = "mongodb+srv://eric:eric@cluster0.dosf3fq.mongodb.net/products?retryWrites=true&w=majority"

module.exports = function() {

    mongoose.connect(uri);

    const mongodb = mongoose.connection;

    mongodb.on("error", console.error.bind(console, 'Connection Error'));
    mongodb.once("open", ()=> {
        console.log('Connected to MongDB');
    });

    return mongodb;
}
