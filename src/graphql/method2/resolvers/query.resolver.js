const { CategoryModel } = require("../../../modules/category/category.model");
const { OptionModel } = require("../../../modules/option/option.model");
const { PostModel } = require("../../../modules/post/post.model");
const userModel = require("../../../modules/user/user.model");

const queryResolver = {
        Query : {
            hello: ()=> "world",
            getPosts: async () => {
                return await PostModel.find();
            },
            getUsers: async () => {
                return await userModel.find();
            },
            getOptions: async () => {
                return await OptionModel.find();
            },
            getCategories: async()=>{
                return await CategoryModel.find({'parent': null});
            }
        }
};

module.exports = {
    queryResolver
};