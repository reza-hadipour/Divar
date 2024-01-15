const { GraphQLList } = require("graphql");
const { CategoryModel } = require("../../modules/category/category.model")
const { CategoryType } = require("../typeDefs/category.type")


const CategoryResolver = {
    type: new GraphQLList(CategoryType),
    resolve: async()=>{
        return await CategoryModel.find({'parent': null});
    }
}

const PostCategoryResolver = {
    type: CategoryType,
    resolve: async (parent) => {
        return await CategoryModel.findById(parent?.category)
    }
}

const CategoryResolverInPost = {
    type: CategoryType,
    resolve: async (parent) => {
        return await CategoryModel.findById(parent?.category)
    }
}


module.exports = {
    CategoryResolver,
    CategoryResolverInPost,
    PostCategoryResolver
}