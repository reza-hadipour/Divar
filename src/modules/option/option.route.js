const optionController = require('./option.controller');

const router = require('express').Router();


router.post('/', optionController.createOption)
router.get('/by-category/:categoryId',optionController.findByCategoryId)
router.get('/:id',optionController.findById)
router.get('/',optionController.find)

module.exports = {
    OptionRouter : router
}