const { createCategory,updateCategory,removeCategory  } = require("../category/category.resolver")


const rootResolver = {
    Mutation: {
        createCategory,
        updateCategory,
        removeCategory
    }
}

module.exports = {
    rootResolver
}