const {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLFloat, graphql} = require('graphql');
const {GraphQLJSONObject} = require('graphql-type-json');
const { UserResolver } = require('../queries/user.reslver');
const { CategoryResolverInPost } = require('../queries/post.resolver');

const PostType = new GraphQLObjectType({
    name: "postType",
    fields : ()=> ({
        title: {type: GraphQLString},
        content: {type: GraphQLString},
        province: {type: GraphQLString},
        city: {type: GraphQLString},
        district: {type: GraphQLString},
        address: {type: GraphQLString},
        coordinate: {type: new GraphQLList(GraphQLFloat)},
        images: {type: new GraphQLList(GraphQLString)},
        amount: {type: GraphQLInt},
        options: {type: GraphQLJSONObject},
        createdAt: {type: GraphQLString},
        category: CategoryResolverInPost,
        user: UserResolver
    })
})

module.exports = {
    PostType
}