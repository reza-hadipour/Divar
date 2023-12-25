const postController = require('./post.controller');

const router = require('express').Router();

router.get('/create', postController.createPostPage)

module.exports = {
    PostRouter : router
}