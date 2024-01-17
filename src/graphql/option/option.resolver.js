const { CategoryModel } = require("../../modules/category/category.model");
const { OptionModel } = require("../../modules/option/option.model");

const rootResolver = {
        Option: {
            category: async (parent) => {
                return await CategoryModel.findById(parent?.category)
            }
        }
    
};

const getOptions = async () => {
    return await OptionModel.find();
}

const getOptionById = async () => {
    return await OptionModel.find();
}

module.exports = {
    rootResolver,
    getOptions,
    getOptionById
}