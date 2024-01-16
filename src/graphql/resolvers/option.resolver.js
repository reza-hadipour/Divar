const { CategoryModel } = require("../../modules/category/category.model");

module.exports = {
        Option: {
            category: async (parent) => {
                return await CategoryModel.findById(parent?.category)
            }
        }
    
};