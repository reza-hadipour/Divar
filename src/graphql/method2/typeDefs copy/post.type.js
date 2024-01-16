// const { gql } = require('apollo-server-express');
const { buildSchema } = require('graphql');

const postTypeDefs = `
    type Post {
        title: String,
        content: String,
        province: String,
        city: String,
        district: String,
        address: String,
        coordinate: [Float],
        images: [String],
        amount: Int,
        options: JSONObject,
        createdAt: String,
        category: Category,
        user: User
    }
`;

module.exports = { postTypeDefs };