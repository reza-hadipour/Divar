const optionController = require('./option.controller');

const router = require('express').Router();


router.post('/', optionController.createOption)
router.get('/by-category/:categoryId',optionController.findByCategoryId)
router.get('/by-category-slug/:slug',optionController.findByCategorySlug)
router.get('/:id',optionController.findById)
router.delete('/:id',optionController.removeById)
router.put('/:id',optionController.updateOption)
router.get('/',optionController.find)

module.exports = {
    OptionRouter : router
}