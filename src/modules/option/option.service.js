const autoBind = require("auto-bind");
const {OptionModel} = require("./option.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const OptionMessage = require("./option.message");
const categoryService = require("../category/category.service");
const { default: slugify } = require("slugify");
const {isTrue} = require('../../common/utils/functions');

class OptionService{
    #model;
    #categoryService;
    constructor(){
        autoBind(this);
        this.#model = OptionModel
        this.#categoryService = categoryService
    }

    async createOption(optionDto){
        // Check category exists
        const category = await this.#categoryService.checkExistById(optionDto.category);
        optionDto.category = category._id;
        optionDto.key = slugify(optionDto.key,{trim:true, lower: true, replacement: "_"});

        // Check conflict for duplicate key in category
        await this.alreadyExistByCategoryAndKey(optionDto.key, category._id);

        // Check enum type and normalizing it
        if(optionDto?.enum && typeof optionDto.enum === "string" ){
            optionDto.enum = optionDto.enum.split(',');
        }else if(!Array.isArray(optionDto.enum)){
            optionDto.enum = []
        }

        // Check required value
        optionDto.required = isTrue(optionDto.required) ? true : false;

        // Create Option
        const option = await this.#model.create(optionDto);
        return option;
    }

    async updateOption(id, optionDto){
        // Check option exist
        const existOption = await this.checkExistById(id);

        // Check category exists
        if(optionDto.category && isValidObjectId(optionDto.category)){
            const category = await this.#categoryService.checkExistById(optionDto.category);
            optionDto.category = category._id;
        }else{
            delete optionDto.category;
        }

        // Check conflict for duplicate key in category
        if(optionDto.key && optionDto.key !== ""){
            optionDto.key = slugify(optionDto.key,{trim:true, lower: true, replacement: "_"});
            let categoryId = existOption.category;
            await this.alreadyExistByCategoryAndKey(optionDto.key, categoryId, id);
        }else{
            delete optionDto.key;
        }

        // Check enum type and normalizing it
        if(optionDto?.enum && typeof optionDto.enum === "string" ){
            optionDto.enum = optionDto.enum.split(',');
        }else if(!Array.isArray(optionDto.enum)){
            delete optionDto.enum;
        }

        if(!optionDto.type && optionDto.type === ""){
            delete optionDto.type;
        }

        if(!optionDto.guid && optionDto.guid === ""){
            delete optionDto.guid;
        }

        // Check required value
        optionDto.required = isTrue(optionDto.required) ? true : false;

        // Create Option
        return await this.#model.updateOne({_id:id},{$set: optionDto});
    }

    async findByCategoryId(category){
        const option = await this.#model.find({category},{__v:0}).populate([{path: "category", select: {name:1, slug:1}}]);
        return option;
    }

    async findByCategorySlug(slug){
        const options = await this.#model.aggregate([
            {
                $lookup : {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category"
            }
        },{
            $unwind : "$category"
        },{
            $addFields : {
                categoryName : "$category.name",
                categorySlug : "$category.slug",
                categoryIcon : "$category.icon",
            }
        },{
            $project : {
                __v : 0,
                category : 0
            }
        },{
            $match : {
                categorySlug : slug
            }
        }
        ])
        return options;
    }

    async findById(id){
        const option = await this.#model.findById(id,{__v:0}).populate([{path: "category", select: {name:1, slug:1}}]);
        return option;
    }

    async removeById(id){
        const option = await this.checkExistById(id);
        return await this.#model.findByIdAndDelete(id);
    }

    async find(){
        const options = await this.#model.find({},{__v : 0},{sort: {_id: -1}}).populate([{path: "category", select: {name:1, slug:1}}])
        return options;
    }

    async checkExistById(id){
        const option = await this.#model.findById(id).lean();
        if(!option) throw new createHttpError.NotFound(OptionMessage.notFound);
        return option;
    }

    async alreadyExistByCategoryAndKey(key,category, exceptionId = null){
        const isExist = await this.#model.findOne({key, category, _id : {$ne : exceptionId}}).lean();
        if(isExist) throw new createHttpError.Conflict(OptionMessage.alreadyExist);
        return null;
    }
}


module.exports = new OptionService();