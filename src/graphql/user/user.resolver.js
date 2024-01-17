const userModel = require("../../modules/user/user.model");

const getUsers = async () => {
    return await userModel.find();
}

const getUserById = async (_,{id}) => {
    return await userModel.findById(id);
}

module.exports = {
    getUsers,
    getUserById
}