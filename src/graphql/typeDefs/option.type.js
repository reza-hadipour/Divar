const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");
const { CategoryType } = require("./category.type");
const { PostCategoryResolver } = require("../queries/category.resolver");

const OptionType = new GraphQLObjectType({
    name: 'optionType',
    fields: ()=>{
        return{
            title: {type: GraphQLString},
            key: {type: GraphQLString},
            type: {type: GraphQLString},
            enum: {type: new GraphQLList(GraphQLString)},
            required: {type: GraphQLBoolean},
            guid: {type: GraphQLString},
            category: PostCategoryResolver
        }}
})

module.exports = {
    OptionType
}