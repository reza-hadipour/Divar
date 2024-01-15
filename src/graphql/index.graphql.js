const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const { PostResolver } = require('./queries/post.resolver');
const { CategoryResolver } = require('./queries/category.resolver');
const { OptionResolver, OptionByCatIdResolver, OptionByCatSlug, OptionById } = require('./queries/option.resolver');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    posts: PostResolver,
    categories: CategoryResolver,
    options: OptionResolver,
    optionById: OptionById,
    optionByCatId: OptionByCatIdResolver,
    optionByCatSlug: OptionByCatSlug
  }
});


const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {

  }
});


const graphQlSchema = new GraphQLSchema({
  query: RootQuery,
  //   mutation: RootMutation
});


module.exports = {
  graphQlSchema
};