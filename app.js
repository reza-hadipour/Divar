const express = require('express');
const swaggerUi = require('swagger-ui-express');
const routes = require('./src/app.routes');
const notFoundHandler = require('./src/common/exception/notFound.handler');
const allExceptionHandler = require('./src/common/exception/allException.handler');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const expressEjsLayouts = require('express-ejs-layouts');

class Application{

    app;
    constructor(){
        this.setupMongoDB();
        this.setupExpress();
        this.setConfigs(this.app);
        this.setEJS(this.app);
        this.setRoutes(this.app);
        this.setupSwagger(this.app);
        this.setErrorHandlers(this.app)
    }

    setupExpress(){
        this.app = express();
        const port = process.env.PORT || 3000;
        this.app.listen(port, ()=>{
            console.log(`Server is running on port ${port}`, `http://localhost:${port}`);
        })
    }

    setupMongoDB(){
        require('./src/config/mongoose.config');
    }

    setupSwagger(app){
        const swaggerDocument = require('./src/config/swagger.config');
        app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
    }

    setRoutes(app){
        app.use(routes)
    }

    setErrorHandlers(app){
        notFoundHandler(app);
        allExceptionHandler(app);
    }

    setConfigs(app){
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
        app.use(express.static('public'))
    }

    setEJS(app){
        app.use(expressEjsLayouts);
        app.set('view engine','ejs')
        app.set('layout','./layouts/panel/main.ejs')
    }
}

module.exports = Application;