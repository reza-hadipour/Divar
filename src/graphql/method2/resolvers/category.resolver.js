const { CategoryModel } = require("../../../modules/category/category.model");

module.exports = {
        Category: {
            parent: async (parent)=>{
                return await CategoryModel.findById(parent?.parent);
            },
            parents : async (parent)=>{
                return await CategoryModel.find({_id: {$in: parent?.parents}});
            }
        }
    
};

// module.exports = {
//     categoryResolver
// };