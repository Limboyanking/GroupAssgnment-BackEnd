const { model } = require('mongoose');
const Advertisement = require('../models/advertisement.model');

// List advertisement list
exports.advertisementList = function(req, res, next) {
    Advertisement.find((err, advertisementList) => {

        if (err) {
            return console.error(err);
        } else {
            res.render('advertisement/list', {
                title: 'Advertisment List',
                name: 'Eric Chan',
                AdvertisementList: advertisementList
            })
        }
        }).sort( {"category": 1});
}
