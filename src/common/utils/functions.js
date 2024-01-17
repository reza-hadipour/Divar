const path = require('path');
const fs = require('fs');


const isTrue = (value) => ["true",1,true].includes(value);

const removePropertyInObject = (target= {}, properties = [])=>{
    for (const item of properties) {
        delete target[item]
    }
    return JSON.parse(JSON.stringify(target));
}


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

    return typeDefs.join(' ');
}

const loadResolvers = (folderPath) => {
    const files = fs.readdirSync(folderPath);

    const resolvers = files.reduce((acc,file)=>{
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath)
        if(stat.isDirectory()){
            const nestedResolvers = loadResolvers(filePath);
            return { ...acc, ...nestedResolvers };
        }else if (stat.isFile() && file.endsWith('.resolver.js')){
            const {rootResolver} = require(filePath);
            // console.log(filePath,acc);
            // console.log(filePath,resolver);
            return {...acc, ...rootResolver}
        } else {
            return acc
        }
    }, {});

    return resolvers;
}

module.exports = {
    isTrue,
    removePropertyInObject,
    loadTypeDefs,
    loadResolvers
}