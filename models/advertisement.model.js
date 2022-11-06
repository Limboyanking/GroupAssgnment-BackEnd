const mongoose = require('mongoose');

const advertisementModel = mongoose.Schema(
    {
        category: String,
        title: String,
        description: String,
        condition: String,
        price: Number,
        sold: Boolean,
        deliveryMethod: String,
        creationDate: Date,
        publishedDate: Date,
        expiryDate: Date,
        userName: String
    },
    {
        collection: "advertisement"
    }
);

module.exports = mongoose.model('advertisementList', advertisementModel);
