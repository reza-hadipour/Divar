// const { gql } = require('apollo-server-express');
// const { buildSchema } = require('graphql');
const {postTypeDefs} = require('./post.type');
const {userTypeDefs} = require('./user.type');
const {optionTypeDefs} = require('./option.type');
const {categoryTypeDefs} = require('./category.type');


const queryTypeDefs = `
    type Query {
        hello: String
        getPosts : [Post]
        getUsers : [User]
        getOptions : [Option]
        getCategories: [Category]
    }
`;

module.exports = { 
    typeDefs : [queryTypeDefs,postTypeDefs,userTypeDefs,optionTypeDefs,categoryTypeDefs]
 };