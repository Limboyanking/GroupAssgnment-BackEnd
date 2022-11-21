const mongoose = require('mongoose');
const config = require('./config');

// const uri = "mongodb+srv://<>:<>@cluster0.htedkjhiu.mongodb.net/hnuogyu?retryWrites=true&w=majority"
const uri = "mongodb+srv://" + config.ATLASDB_USERNAME + ":" + config.ATLASDB_PASSWORD + config.ATLASDB;

module.exports = function() {
    console.log(uri);

    mongoose.connect(uri);

    const mongodb = mongoose.connection;

    mongodb.on("error", console.error.bind(console, 'Connection Error'));
    mongodb.once("open", ()=> {
        console.log('Connected to MongDB');
    });

    return mongodb;
}
