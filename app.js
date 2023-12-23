const express = require('express');
const swaggerUi = require('swagger-ui-express');
const routes = require('./src/modules/app.routes');
const notFoundHandler = require('./src/common/exception/notFound.handler');
const allExceptionHandler = require('./src/common/exception/allException.handler');
const cookieParser = require('cookie-parser');


class Application{

    app;
    constructor(){
        this.setupMongoDB();
        this.setupExpress();
        this.setConfigs();
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

    setConfigs(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
    }
}

module.exports = Application;