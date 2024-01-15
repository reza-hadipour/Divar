const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
// const { PostResolver } = require('./queries/post.resolver');
// const { CategoryResolver } = require('./queries/category.resolver');
// const { OptionResolver, OptionByCatIdResolver, OptionByCatSlug, OptionById } = require('./queries/option.resolver');
const userModel = require('../../modules/user/user.model');
const { UserType } = require('../typeDefs/user.type');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    hello : {
      type: GraphQLString,
      resolve: ()=> "World",
    },
    getUser : {
      type: UserType,
      resolve: async ()=> {
      return await userModel.find();
      }
    }
  }
});


const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {

  }
});


const graphQlSchemaM2 = new GraphQLSchema({
  query: RootQuery,
  //   mutation: RootMutation
});


module.exports = {
  graphQlSchemaM2
};