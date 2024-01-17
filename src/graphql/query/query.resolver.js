const {GraphQLJSON, GraphQLJSONObject} = require('graphql-type-json');

const { getCategories, getCategoryById } = require('../category/category.resolver');
const { getPosts, getPostById } = require('../post/post.resolver');
const { getUsers, getUserById } = require('../user/user.resolver');
const { getOptions, getOptionById } = require('../option/option.resolver');

const rootResolver = {
        JSON: GraphQLJSON,
        JSONObject: GraphQLJSONObject,
        Query : {
            getPosts,
            getPostById,
            getUsers,
            getUserById,
            getOptions,
            getOptionById,
            getCategories,
            getCategoryById
        }
};

module.exports = {
    rootResolver
}