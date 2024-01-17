const path = require('path');

const { loadTypeDefs, loadResolvers } = require('../common/utils/functions');

const typeDefs = loadTypeDefs(path.resolve(__dirname));
const resolvers = loadResolvers(path.resolve(__dirname));

module.exports = {
  typeDefs,
  resolvers
}