const Authorization = require('../../common/guard/authorization.guard.js');
const authController = require('./auth.controller.js');
const router = require('express').Router();

router.post('/send-otp', authController.sendOTP);
router.post('/check-otp', authController.checkOTP);
router.get('/logout',Authorization ,authController.logout);

module.exports = {
    AuthRouter: router
}