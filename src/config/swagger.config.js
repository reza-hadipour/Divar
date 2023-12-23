const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerDocument = swaggerJsDoc({
    swaggerDefinition : {
        openapi: "3.0.1",
        info: {
            title: "Divar Backend",
            version: "1.0.0",
            description: "A practical nodejs project."
        }
    },
    apis: [path.join(__dirname,'..','..','**','*.swagger.js')]
    // apis: [process.cwd()+ '/src/modules/**/*.swagger.js']
})

module.exports = swaggerDocument;