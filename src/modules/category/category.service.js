const autoBind = require("auto-bind");
const {CategoryModel} = require("./category.model");
const {OptionModel} = require("../option/option.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const CategoryMessage = require("./category.message");
const { default: slugify } = require("slugify");

class CategoryService{
    #model;
    #optionModel;
    constructor(){
        autoBind(this);
        this.#model = CategoryModel;
        this.#optionModel = OptionModel;
    }

    async updateCategory(id,categoryDto){
        const category = await this.checkExistById(id);
        
        if(categoryDto?.parent && isValidObjectId(categoryDto.parent)){

            // Check new parent Id it exists?
            const parentCategory = await this.checkExistById(categoryDto.parent);
            categoryDto.parent = parentCategory._id;

            // remove old parent from parents
            category.parents.remove(category.parent);
            
            categoryDto.parents = [
                ... new Set(([parentCategory._id.toString()].concat(
                    category.parents.map(id => id.toString())
                )).map(id => new Types.ObjectId(id))
                )
            ]
        }

        if(categoryDto?.slug){
            categoryDto.slug = slugify(categoryDto.slug);
            await this.alreadyExistBySlug(categoryDto.slug,id);
        }else if( categoryDto?.name){
            categoryDto.slug = slugify(categoryDto.name);
            await this.alreadyExistBySlug(categoryDto.slug,id);
        }
        
        category.set(categoryDto);
        await category.save();
        // console.log('categoryDto: ',categoryDto);
        // return await this.#model.findByIdAndUpdate(id,categoryDto,{new : true});

        return category;
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

    async removeCategory(id){
        // check category exist
        await this.checkExistById(id);
        return this.#optionModel.deleteMany({category: id}).then(async ()=>{
            return await this.#model.findByIdAndDelete(id);
        })
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

    async alreadyExistBySlug(slug,id= null){
        const category = await this.#model.findOne({$and : [{slug}, {_id : {$ne : id}}]});
        if(category) throw new createHttpError.Conflict (CategoryMessage.alreadyExist)
        return category;
    }
}


module.exports = new CategoryService();