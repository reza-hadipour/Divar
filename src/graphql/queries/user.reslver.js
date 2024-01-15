const userModel = require('../../modules/user/user.model');
const { UserType } = require('../typeDefs/user.type');


const UserResolver = {
    type: UserType,
    resolve: async (parent,args,{req})=>{
        return await userModel.findById(parent.user);
    }
}


module.exports = {
    UserResolver
}