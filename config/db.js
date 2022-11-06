const mongoose = require('mongoose')

const uri = "mongodb+srv://dbuser:5YZ5xseRsOMwM7ZJ@cluster018.xkwadxk.mongodb.net/?retryWrites=true&w=majority"

module.exports = function() {

    mongoose.connect(uri);

    const mongodb = mongoose.connection;

    mongodb.on("error", console.error.bind(console, 'Connection Error'));
    mongodb.once("open", ()=> {
        console.log('Connected to MongDB');
    });

    return mongodb;
}
