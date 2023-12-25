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

}


module.exports = new PostService()