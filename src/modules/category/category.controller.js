const autoBind = require("auto-bind");
const CategoryMessage = require("./category.message");
const categoryService = require("./category.service");
const HttpCodes = require('http-codes');

class CategoryController{
    #service;

    constructor(){
        autoBind(this);
        this.#service = categoryService
    }

    async createCategory(req,res,next){
        try {
            const {name,slug,icon,parent} = req.body;
            await this.#service.creteCategory({name,slug,icon,parent});
            return res.status(HttpCodes.CREATED).json({
                message: CategoryMessage.createCategorySuccessfully
            })
        } catch (error) {
            next(error)
        }
    }

    async removeCategory(req,res,next){
        try {
            const {id} = req.params;
            let result = await this.#service.removeCategory(id);
            return res.status(HttpCodes.OK).json({
                message: CategoryMessage.deleteCategorySuccessfully,
                result
            })
        } catch (error) {
            next(error);
        }
    }

    async getAllCategories(req,res,next){
        try {
            const categories = await this.#service.findCategories();
            return res.status(HttpCodes.OK).json(categories);
        } catch (error) {
            next(error)
        }
    }
}


module.exports = new CategoryController();