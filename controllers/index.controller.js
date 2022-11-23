let User = require('../models/user.model');
let passport = require('passport');
let jwt = require('jsonwebtoken');
let config = require('../config/config');
const { errorHandlerMiddleware } = require('../config/error-handler');

module.exports.landing = function(err, req, res, next) {

    if (err) {
        let message = getErrorMessage(err);

        return res.status(400).json(
            {
                success: false, 
                message: message
            }
        );
    }
    return res.json(
        {
            success: true, 
            message: 'Landing successfully!'
        }
    ); 

};