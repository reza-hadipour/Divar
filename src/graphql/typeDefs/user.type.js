const {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt} = require('graphql');


const UserType = new GraphQLObjectType({
    name: "userType",
    fields : {
        fullName: {type: GraphQLString},
        mobile: {type: GraphQLString},
    }
})

module.exports = {
    UserType
}