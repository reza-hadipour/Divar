const Authorization = require('../../common/guard/authorization.guard');
const { upload } = require('../../common/utils/multer');
const postController = require('./post.controller');

const router = require('express').Router();

router.get('/create',Authorization, postController.createPostPage)
router.post('/create',Authorization, upload.array("images",5),postController.create)
router.get('/my',Authorization, postController.findMyPost)

module.exports = {
    PostRouter : router
}