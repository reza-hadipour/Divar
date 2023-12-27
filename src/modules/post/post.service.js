const { PostModel } = require("./post.model");
const { OptionModel } = require("../option/option.model");
const autoBind = require("auto-bind");

class PostService{

    #model;
    #optionModel;
    constructor() {
        autoBind(this);
        this.#model = PostModel
        this.#optionModel = OptionModel
    }

    async getCategoryOptions(categoryId){
        const options = await this.#optionModel.find({category:categoryId});
        return options; 
    }

    async create(dto){
        return await this.#model.create(dto);
    }

    async find(query = {}){
        return this.#model.find(query);
    }

    async findMyPosts(user){
        return this.#model.find({user});
    }

    

}


module.exports = new PostService()