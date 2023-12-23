const { AuthRouter } = require('./auth/auth.route');
const { UserRouter } = require('./user/user.route');

const router = require('express').Router();


router.use('/auth', AuthRouter)
router.use('/user', UserRouter)
module.exports = router;