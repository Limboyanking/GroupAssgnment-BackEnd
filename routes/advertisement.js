const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/advertisement.controller');

// List advertisements
router.get('/', advertisementController.advertisementList);

// Add advertisement
router.get('/add', advertisementController.displayAddPage);
router.post('/add', advertisementController.processAddPage);

// Edit an advertisement
router.get('/edit/:id', advertisementController.displayEditPage);
router.post('/edit/:id', advertisementController.processEditPage);

// Delete an advertisement
router.get('/delete/:id', advertisementController.performDelete);

module.exports = router;
