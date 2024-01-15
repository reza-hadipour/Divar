// const { gql } = require('apollo-server-express');
const { buildSchema } = require('graphql');

const userTypeDefs = `
    type User {
        mobile: String
    }
`;

module.exports = { userTypeDefs };