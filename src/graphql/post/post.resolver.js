const { CategoryModel } = require("../../modules/category/category.model");
const { PostModel } = require("../../modules/post/post.model");
const userModel = require("../../modules/user/user.model");

const rootResolver = {
        Post: {
            user: async (parent)=>{
                return await userModel.findById(parent?.user);
            },
            category: async (parent) => {
                return await CategoryModel.findById(parent?.category)
            }
        }
};

const getPosts = async () => {
    return await PostModel.find();
}

const getPostById = async(_,{id})=>{
    return await PostModel.findById(id);
}

module.exports = {
    rootResolver,
    getPosts,
    getPostById
}