// const { gql } = require('apollo-server-express');
// const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');

// const {queryTypeDefs} = require('./query.type');
// const {postTypeDefs} = require('./post.type');
// const {userTypeDefs} = require('./user.type');
// const {optionTypeDefs} = require('./option.type');
// const {categoryTypeDefs} = require('./category.type');

// Read all files in typeDefs

const loadTypeDefs = (folderPath) => {
    const files = fs.readdirSync(folderPath);

    const typeDefs = files.map(file => {
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            return loadTypeDefs(filePath);
        } else if (stat.isFile() && file.endsWith('.type.gql')) {
            return fs.readFileSync(filePath, 'utf-8');
        }
    });

    console.log(typeDefs);
    return typeDefs.join(' ');
}

const typeDefs = loadTypeDefs('./')


// let typeDefs = [queryTypeDefs,postTypeDefs,userTypeDefs,optionTypeDefs,categoryTypeDefs];
// console.log(typeDefs);

module.exports = { 
    typeDefs
    //  : [queryTypeDefs,postTypeDefs,userTypeDefs,optionTypeDefs,categoryTypeDefs]
 };