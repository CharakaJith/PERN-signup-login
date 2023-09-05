const express = require('express');
const router = express.Router();
const Authenticate = require('../middleware/authenticate');
const UserController = require('../controllers/user.controller');

router.post('/register', UserController.registerNewUser);
router.post('/login', UserController.userLogin);
router.get('/get', Authenticate.authenticate, UserController.getUserDetails);
router.post('/logout', Authenticate.authenticate, UserController.userLogout);

module.exports = router;
