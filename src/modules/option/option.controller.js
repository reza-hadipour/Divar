const autoBind = require("auto-bind");
const optionService = require("./option.service");
const OptionMessage = require("./option.message");
const HttpCodes = require('http-codes');

 class OptionController{
    #service;
    constructor(){
        autoBind(this);
        this.#service = optionService;
    }

    
    async createOption(req,res,next){
        try {
            const {title,key,type,guid,category, enum: list,required} = req.body;
            let option = await this.#service.createOption({title,key,type,guid,category, enum: list, required});
            return res.status(HttpCodes.CREATED).json({
                message: OptionMessage.createOptionSuccessfully,
                option
            })
        } catch (error) {
            next(error)
        }
    }
    
    async updateOption(req,res,next){
        try {
            const {id} = req.params;
            const {title,key,type,guid,category, enum: list,required} = req.body;
            let result = await this.#service.updateOption(id,{title,key,type,guid,category, enum: list, required});
            return res.status(HttpCodes.CREATED).json({
                message: OptionMessage.updateOptionSuccessfully,
                result
            })
        } catch (error) {
            next(error)
        }
    }

    async removeById(req,res,next){
        try {
            const {id} = req.params;
            await this.#service.removeById(id);
            return res.status(HttpCodes.OK).json({
                message: OptionMessage.deleteOptionSuccessfully
            })
        } catch (error) {
            next(error)
        }
    }

    async findByCategoryId(req,res,next){
        try {
            const {categoryId} = req.params;
            const options = await this.#service.findByCategoryId(categoryId);
            return res.status(HttpCodes.OK).json(options);
        } catch (error) {
            next(error)
        }
    }

    async findByCategorySlug(req,res,next){
        try {
            const {slug} = req.params;
            const options = await this.#service.findByCategorySlug(slug);
            return res.status(HttpCodes.OK).json(options);
        } catch (error) {
            next(error)
        }
    }

    async findById(req,res,next){
        try {
            const {id} = req.params;
            const option = await this.#service.findById(id);
            return res.status(HttpCodes.OK).json(option);
        } catch (error) {
            next(error)
        }
    }

    async find(req,res,next){
        try {
            const options = await this.#service.find();
            return res.status(HttpCodes.OK).json(options);
        } catch (error) {
            next(error)
        }
    }


}

 module.exports = new OptionController()