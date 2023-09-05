const express = require('express');
const router = express.Router();
const Authenticate = require('../middleware/authenticate');
const OtpController = require('../controllers/otp.controller');

router.post('/send', Authenticate.authenticate, OtpController.sendOtpToEmail);

module.exports = router;
