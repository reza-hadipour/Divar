const { isValidObjectId } = require("mongoose");
const { CategoryModel } = require("../../modules/category/category.model");
const service = require('../../modules/category/category.service');

 const rootResolver = {
        Category: {
            parent: async (parent)=>{
                return await CategoryModel.findById(parent?.parent);
            },
            parents : async (parent)=>{
                return await CategoryModel.find({_id: {$in: parent?.parents}});
            }
        }
    
};

const createCategory = async (parent,args)=>{
    let category = await service.creteCategory(args);
    return category
}

const updateCategory = async (_,args)=>{
    const {id} = args
    delete args['id'];
    console.log(args);
    if(!isValidObjectId(id)) throw new Error('ID is not valid');
    return await service.updateCategory(id,args);
}

const getCategoryById = async(parent,args)=>{
    const {id} = args;
    if(!id) throw new Error('Id must be included.')
    if(!isValidObjectId(id)) throw new Error('Provided Id is not valid');

    let category = await service.checkExistById(id);
    
    if(!category) throw new Error('Category not found.')
    return category;
}

const removeCategory = async(parent,args)=>{
    const {id} = args;
    // get children
    let cat = await service.checkExistById(id);
    let children = cat.children;
    console.log(children);
    // remove children

    return cat;
    // remove parent
    // return await service.removeCategory(id)
}

const getCategories= async()=>{
    return await CategoryModel.find({'parent': null});
}

module.exports = {
    rootResolver,
    createCategory,
    getCategoryById,
    getCategories,
    updateCategory,
    removeCategory
}