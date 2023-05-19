const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register/', authController.handleNewUser);
router.post('/register/local/', authController.handleLocalNewUser);

router.post('/login/', authController.handleLogin);
router.post('/login/local/', authController.handleLocalLogin);

router.get('/refresh/', authController.handleRefreshToken);
router.get('/refresh/local/', authController.handleLocalRefreshToken);

router.get('/logout/', authController.handleLogout);
router.get('/logout/local/', authController.handleLocalLogout);

module.exports = router;