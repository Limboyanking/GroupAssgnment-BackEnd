const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/advertisement.controller');

// List advertisements
router.get('/', advertisementController.advertisementList);

// Delete an advertisement
router.delete('/delete/:id', advertisementController.performDelete);

// Add advertisement
router.get('/add', advertisementController.displayAddPage);
router.post('/add', advertisementController.processAddPage);

// Edit an advertisement
router.get('/edit/:id', advertisementController.displayEditPage);
router.post('/edit/:id', advertisementController.processEditPage);

module.exports = router;
