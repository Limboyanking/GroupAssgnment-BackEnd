const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/advertisement.controller');

// List business contacts

router.get('/', advertisementController.advertisementList);

module.exports = router;
