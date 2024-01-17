const { createCategory,updateCategory } = require("../category/category.resolver")


const rootResolver = {
    Mutation: {
        createCategory,
        updateCategory
    }
}

module.exports = {
    rootResolver
}