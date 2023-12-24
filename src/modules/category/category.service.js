const autoBind = require("auto-bind");
const categoryModel = require("./category.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const CategoryMessage = require("./category.message");
const { default: slugify } = require("slugify");

class CategoryService{
    #model;
    constructor(){
        autoBind(this);
        this.#model = categoryModel
    }

    async creteCategory(categoryDto){
        if(categoryDto?.parent && isValidObjectId(categoryDto.parent)){
            const existCategory = await this.checkExistById(categoryDto.parent);
            categoryDto.parent = existCategory._id;
            categoryDto.parents = [
                ... new Set(([existCategory._id.toString()].concat(
                    existCategory.parents.map(id => id.toString())
                )).map(id => new Types.ObjectId(id))
                )
            ]
        }

        if(categoryDto?.slug){
            categoryDto.slug = slugify(categoryDto.slug);
            await this.alreadyExistBySlug(categoryDto.slug);
        }else{
            categoryDto.slug = slugify(categoryDto.name);
        }

        const category = await this.#model.create(categoryDto);
        return category;
        
    }

    async findCategories(){
        const categories = await this.#model.find({parent : null}).populate([{path:"children"}]).exec();
        return categories;
    }

    async checkExistById(id){
        const category = await this.#model.findById(id);
        if(!category) throw new createHttpError.NotFound(CategoryMessage.notFound)
        return category;
    }

    async checkExistBySlug(slug){
        const category = await this.#model.findOne({slug});
        if(!category) throw new createHttpError.NotFound(CategoryMessage.notFound)
        return category;
    }

    async alreadyExistBySlug(slug){
        const category = await this.#model.findOne({slug});
        if(category) throw new createHttpError.Conflict (CategoryMessage.alreadyExist)
        return category;
    }
}


module.exports = new CategoryService();