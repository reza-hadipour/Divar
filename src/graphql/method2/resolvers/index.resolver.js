const {postResolver : Post} = require('./post.resolver');
const {queryResolver : Query} = require('./query.resolver');
const {optionResolver : Option} = require('./option.resolver');
const {categoryResolver: Category} = require('./category.resolver');

const {GraphQLJSON, GraphQLJSONObject} = require('graphql-type-json');

const resolvers = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    ...Post,
    ...Option,
    ...Category,
    ...Query
}

module.exports = {
    resolvers
} 
    