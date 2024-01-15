const { PostModel } = require("../../../modules/post/post.model");
const userModel = require("../../../modules/user/user.model");

const resolvers = {
        Query : {
            hello: ()=> "world",
            getPosts: async () => {
                return await PostModel.find();
            },
            getUsers: async () => {
                return await userModel.find();
            }
        },
        Post: {
            user: async (parent)=>{
                return await userModel.findById(parent?.user);
            }
        }
    
};

module.exports = {
    resolvers
};