const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/advertisement.controller');
const authController = require('../controllers/auth.controller');


// List advertisements
router.get('/', advertisementController.advertisementList);

// Edit an advertisement
// router.get('/edit/:id', authController.requireAuth, authController.isAllowed, advertisementController.displayEditPage);
router.put('/edit/:id', authController.requireAuth, authController.isAllowed, advertisementController.processEdit);

// Delete an advertisement
router.delete('/delete/:id', authController.requireAuth, authController.isAllowed, advertisementController.performDelete);


// Add advertisement
// router.get('/add', authController.requireAuth, advertisementController.displayAddPage);
router.post('/add', authController.requireAuth, advertisementController.processAdd);


module.exports = router;
