const { CategoryModel } = require("../modules/category/category.model");

// Resolve for parent in categories
const CategoryParentResolver = async (parent,args,context) => { return await CategoryModel.findById(parent?.parent)}

// Resolve for parents in categories
const CategoryParentsResolver = async (parent,args,context) => { return  await CategoryModel.find({_id : {$in : parent?.parents}})}


module.exports = {
    CategoryParentResolver,
    CategoryParentsResolver
}