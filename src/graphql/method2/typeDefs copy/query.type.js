module.exports.queryTypeDefs = `
    scalar JSONObject
    scalar JSON

    type Query {
        hello: String
        getPosts : [Post]
        getUsers : [User]
        getOptions : [Option]
        getCategories: [Category]
    }
`;