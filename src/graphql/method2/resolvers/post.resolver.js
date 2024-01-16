const { CategoryModel } = require("../../../modules/category/category.model");
const userModel = require("../../../modules/user/user.model");

module.exports = {
        Post: {
            user: async (parent)=>{
                return await userModel.findById(parent?.user);
            },
            category: async (parent) => {
                return await CategoryModel.findById(parent?.category)
            }
        }
    
};

// module.exports = {
//     postResolver
// };