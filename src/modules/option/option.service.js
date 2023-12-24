const autoBind = require("auto-bind");
const optionModel = require("./option.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const OptionMessage = require("./option.message");
const categoryService = require("../category/category.service");
const { default: slugify } = require("slugify");

class OptionService{
    #model;
    #categoryService;
    constructor(){
        autoBind(this);
        this.#model = optionModel
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

        // Create Option
        const option = await this.#model.create(optionDto);
        return option;
    }

    async findByCategoryId(category){
        const option = await this.#model.find({category},{__v:0}).populate([{path: "category", select: {name:1, slug:1}}]);
        return option;
    }

    async findById(id){
        const option = await this.#model.findById(id,{__v:0}).populate([{path: "category", select: {name:1, slug:1}}]);
        return option;
    }

    async find(){
        const options = await this.#model.find({},{__v : 0},{sort: {_id: -1}}).populate([{path: "category", select: {name:1, slug:1}}])
        return options;
    }

    async checkExistById(id){
        
    }

    async alreadyExistByCategoryAndKey(key,category){
        const isExist = await this.#model.findOne({key, category}).lean();
        if(isExist) throw new createHttpError.Conflict(OptionMessage.alreadyExist);
        return null;
    }
}


module.exports = new OptionService();