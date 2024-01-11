const {GraphQLObjectType,GraphQLSchema, GraphQLInt, GraphQLString} = require('graphql');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    blogs : {
        type : new GraphQLObjectType({
            name: "blogsType",
            fields : {
                id: {type: GraphQLInt},
                title: {type: GraphQLString},
                text: {type: GraphQLString}
            }
        }),
        resolve: ()=>{
            return {
                id: 1,
                title: "title of blog",
                text: 'text of blog',
                
            }
        }
    }
   
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