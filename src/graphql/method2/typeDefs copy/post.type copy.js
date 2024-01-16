// const { gql } = require('apollo-server-express');
const { buildSchema } = require('graphql');

const typeDefs = buildSchema(`
    type Post {
        title: String
        user: User
    }

    type User {
        mobile: String
    }

    type Query {
        hello: String
        getPosts : [Post]
        getUsers : [User]
    }
`);

module.exports = { typeDefs };