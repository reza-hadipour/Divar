const categoryController = require('./category.controller');

const router = require('express').Router();

router.post('/',categoryController.createCategory);
router.get('/',categoryController.getAllCategories);

module.exports = {
    CategoryRouter : router
}