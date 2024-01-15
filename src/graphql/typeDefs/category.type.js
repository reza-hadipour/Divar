const {GraphQLObjectType, GraphQLString, GraphQLList} = require('graphql');
const {CategoryParentResolver, CategoryParentsResolver} = require('../util');


const CategoryType = new GraphQLObjectType({
    name: "categoryType",
    fields : ()=>{

        parent = {
            type: CategoryType,
            resolve: CategoryParentResolver
        }

        parents = {
            type : new GraphQLList(CategoryType),
            resolve: CategoryParentsResolver
        }

        return {
            _id: {type: GraphQLString},
            name: {type: GraphQLString},
            slug: {type: GraphQLString},
            icon: {type: GraphQLString},
            parent,
            parents,
            children: {type: new GraphQLList(CategoryType)}
        }
    }
})

module.exports = {
    CategoryType
}