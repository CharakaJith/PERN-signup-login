const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post('/register', UserController.registerNewUser);
router.post('/login', UserController.userLogin);

module.exports = router;
