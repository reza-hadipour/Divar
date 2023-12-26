const { upload } = require('../../common/utils/multer');
const postController = require('./post.controller');

const router = require('express').Router();

router.get('/create', postController.createPostPage)
router.post('/create', upload.array("images",5), postController.create)
module.exports = {
    PostRouter : router
}