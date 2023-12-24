const { AuthRouter } = require('./auth/auth.route');
const { CategoryRouter } = require('./category/category.route');
const { OptionRouter } = require('./option/option.route');
const { UserRouter } = require('./user/user.route');

const router = require('express').Router();


router.use('/auth', AuthRouter)
router.use('/user', UserRouter)
router.use('/category',CategoryRouter)
router.use('/option',OptionRouter)
module.exports = router;