const { GraphQLList, buildSchema } = require('graphql');
const {PostType} = require('../typeDefs/post.type');
const {PostModel} = require('../../modules/post/post.model');
const  CategoryType  = require('../typeDefs/category.type');

// const PostResolver = {
//     type: new GraphQLList(PostType),
//     resolve: async (parent,args,{req})=>{
//         let posts = await PostModel.find().populate([
//             {path: 'user'},
//             {path: 'category',
//                 populate: {
//                     path: 'parent',
//                     populate: (
//                         [{path: 'parent'},{path: 'parents'}]
//                     )
//                 }
//             }
//         ]).exec();
//     // console.log(posts[0].category.parents);
//     return posts;
//     }
// }

const PostResolver = {
    type: new GraphQLList(PostType),
    resolve: async (parent,args,{req})=>{return await PostModel.find()}
}

const CategoryResolverInPost = {
    type: CategoryType.CategoryType,
    resolve: async (parent) => {
        return await CategoryModel.findById(parent?.category)
    }
}


module.exports = {
    PostResolver,
    CategoryResolverInPost
}