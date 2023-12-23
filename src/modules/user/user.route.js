const Authorization = require('../../common/guard/authorization.guard.js');
const userController = require('./user.controller.js');
const router = require('express').Router();

router.get('/whoami', Authorization , userController.whoAmI);

module.exports = {
    UserRouter: router
}