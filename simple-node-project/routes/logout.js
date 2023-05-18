const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController');

router.get('/', logoutController.handleLogout);
router.get('/local/', logoutController.handleLocalLogout);

module.exports = router;