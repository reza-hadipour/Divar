const { AuthRouter } = require('./modules/auth/auth.route');
const { CategoryRouter } = require('./modules/category/category.route');
const { OptionRouter } = require('./modules/option/option.route');
const postController = require('./modules/post/post.controller');
const { PostRouter }  = require('./modules/post/post.route');
const { UserRouter } = require('./modules/user/user.route');
const router = require('express').Router();

router.use('/auth', AuthRouter)
router.use('/user', UserRouter)
router.use('/category', CategoryRouter)
router.use('/option', OptionRouter)
router.use('/post', PostRouter)

router.get('/', postController.postList)

router.get('/panel', (req,res,next)=>{
    res.render("./pages/panel/dashboard.ejs");
})

router.get('/auth/login', (req,res,next)=>{
    res.locals.layout = "./layouts/auth/main.ejs"
    res.render("./pages/auth/login.ejs");
})


module.exports = router;