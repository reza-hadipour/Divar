const path = require('path');

const { loadTypeDefs, loadResolvers } = require('../common/utils/functions');

const typeDefs = loadTypeDefs(path.resolve(__dirname,'typeDefs'));
const resolvers = loadResolvers(path.resolve(__dirname,'resolvers'));

module.exports = {
  typeDefs,
  resolvers
}