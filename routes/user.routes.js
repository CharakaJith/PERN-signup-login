const express = require('express');
const router = express.Router();
const Authenticate = require('../middleware/authenticate');
const UserController = require('../controllers/user.controller');

router.post('/register', UserController.registerNewUser);
router.post('/login', UserController.userLogin);
router.post('/logout', Authenticate.authenticate, UserController.userLogout);

module.exports = router;
