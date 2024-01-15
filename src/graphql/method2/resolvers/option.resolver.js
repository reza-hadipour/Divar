const { CategoryModel } = require("../../../modules/category/category.model");
const { PostModel } = require("../../../modules/post/post.model");
const userModel = require("../../../modules/user/user.model");

const optionResolver = {
        Option: {
            category: async (parent) => {
                return await CategoryModel.findById(parent?.category)
            }
        }
    
};

module.exports = {
    optionResolver
};