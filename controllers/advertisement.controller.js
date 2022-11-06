const { model } = require('mongoose');
const Advertisement = require('../models/advertisement.model');

function getErrorMessage(err) {    
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } 
    if (err.message) {
        return err.message;
    } else {
        return 'Unknown server error';
    }
};

// List advertisement list
exports.advertisementList = function(req, res, next) {
    Advertisement.find((err, advertisementList) => {
        if (err) {
            console.error(err);
            // To be completed
        } else {
            res.render('advertisement/list', {
                title: 'Advertisement List',
                AdvertisementList: advertisementList
            })
        }
        }).sort( {"category": 1});
}

// Add advertisement
module.exports.displayAddPage = (req, res, next) => {
    let newAdv = Advertisement();
    res.render('advertisement/add_edit', {
        title: 'Post a new Advertisement',
        Advertisement: newAdv
    });
}

// Process add advertisement
module.exports.processAddPage = (req, res, next) => {

    console.log(req.body);

    let newAdvertisement = Advertisement({
        _id: req.body.id,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        condition: req.body.condition,
        price: req.body.price,
        // sold: req.body.sold ? true : false,
        sold: false,
        enable: true,
        deliveryMethod: req.body.deliveryMethod,
        creationDate: Date.now(),
        publishedDate: req.body.publishedDate,
        expiryDate: req.body.expiryDate,
        userName: req.body.userName
    });

    Advertisement.create(newAdvertisement, (err, adv) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            console.log(adv);
            res.redirect('/advertisement');
        }
    });
}

// Upate advertisement
module.exports.displayEditPage = (req, res, next) => {
    
    let id = req.params.id;

    Advertisement.findById(id, (err, adv) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('advertisement/add_edit', {
                title: 'Update Advertisement',
                Advertisement: adv
            })
        }
    });
}

// Process update advertisement
module.exports.processEditPage = (req, res, next) => {

    let id = req.params.id;
    
    console.log(req.body);

    let updatedAdvertisement = Advertisement({
        _id: req.body.id,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        condition: req.body.condition,
        price: req.body.price,
        sold: req.body.sold ? true : false,
        enable: req.body.enable ? true : false,
        deliveryMethod: req.body.deliveryMethod,
        // creationDate: Date.now(),
        publishedDate: req.body.publishedDate,
        expiryDate: req.body.expiryDate,
        userName: req.body.userName
    });

    Advertisement.updateOne({_id: id}, updatedAdvertisement, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/Advertisement');
        }
    });
}

// Delete advertisement
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    Advertisement.remove({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect('/Advertisement');
        }
    });
}
