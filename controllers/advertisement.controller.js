const mongoose = require('mongoose');
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
module.exports.advertisementList = async function(req, res, next) {  

    try {
        let advertisementList = await Advertisement.find().populate({
            path: 'category',
            select: 'category title'
        });

        res.status(200).json(advertisementList);
        
    } catch (error) {
        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    }
}


// Add advertisement
module.exports.processAdd = (req, res, next) => {

    try {

        /* By default, the sold and enable remains false when created*/
        var questionAnswerArray = []
        let newAdvertisement = Advertisement({
            _id: req.body.id,
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            condition: req.body.condition,
            price: req.body.price,
            sold: (req.body.sold == null || req.body.sold == "")? false : true,
            // sold: false,
            enable: (req.body.enable == null || req.body.enable == "")? false : true,
            // enable: true,
            deliveryMethod: req.body.deliveryMethod,
            creationDate: Date.now(),
            publishedDate: req.body.publishedDate,
            expiryDate: req.body.expiryDate,
            userName: req.body.userName,
            questionAnswer: req.body.questionAnswer,
             // If it does not have an owner it assumes the ownership otherwise it assigns it.
             owner: (req.body.owner == null || req.body.owner == "")? req.payload.id : req.body.owner
        });

        Advertisement.create(newAdvertisement, (err, adv) =>{
            if(err)
            {
                console.log(err);

                return res.status(400).json(
                    { 
                        success: false, 
                        message: getErrorMessage(err)
                    }
                );
            }
            else
            {
                console.log(adv);
                res.status(200).json(adv);
            }
        });
    } catch (error) {
        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    }   
    
}


// Upate advertisement
module.exports.processEdit = (req,res,next) => {
    try {
        let id = req.params.id;
        
        // console.log(req.body);

        /* By default, the sold and enable remains false when created*/
        let updatedAdvertisement = Advertisement({
            _id: id,
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            condition: req.body.condition,
            price: req.body.price,
            sold: (req.body.sold == null || req.body.sold == "")? false : true,
            enable: (req.body.enable == null || req.body.enable == "")? false : true,
            deliveryMethod: req.body.deliveryMethod,
            // creationDate: Date.now(),
            publishedDate: req.body.publishedDate,
            expiryDate: req.body.expiryDate,
            userName: req.body.userName,
            questionAnswer: req.body.questionAnswer,
            // If it does not have an owner it assumes the ownership otherwise it assigns it.
            owner: (req.body.owner == null || req.body.owner == "")? req.payload.id : req.body.owner
        });
    
        Advertisement.updateOne({_id: id}, updatedAdvertisement, (err) => {
            if(err)
            {
                console.log(err);
 
                return res.status(400).json(
                    { 
                        success: false, 
                        message: getErrorMessage(err)
                    }
                );
            }
            else
            {
                res.status(200).json(
                    {
                        success: true,
                        message: 'Advertisement updated successfully.'
                    }
                )
            }
        });
    } catch (error) {
        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    }
}



// Delete advertisement
module.exports.performDelete = (req, res, next) => {

    try {
        let id = req.params.id;
        
        Advertisement.deleteOne({_id: id}, (err) => {
            // check invalid id
            if (!mongoose.Types.ObjectId.isValid(id)) {
                // return Error({ status: 422 })
                return res.status(422).json(
                    {
                        success: false,
                        message: 'Invalid _id: ' + id
                    }
                );
            }
            if(err) {
                console.log(err);
                return res.status(400).json(
                    { 
                        success: false, 
                        message: getErrorMessage(err)
                    }
                );
            } else {
                res.status(200).json(
                    {
                        success: true,
                        message: 'Advertisement deleted successfully.'
                    }
                )
            }
        });
    } catch (error) {
        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    }

}