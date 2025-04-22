const express = require('express');
const swaggerUi = require('swagger-ui-express');
const routes = require('./src/app.routes');
const notFoundHandler = require('./src/common/exception/notFound.handler');
const allExceptionHandler = require('./src/common/exception/allException.handler');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const expressEjsLayouts = require('express-ejs-layouts');
const moment = require('jalali-moment');
const session = require('express-session');
const flash = require('connect-flash');
const connectMongo = require('connect-mongo');
const cors = require('cors');

// Apollo Server libraries
const { ApolloServer: ApolloServerExpress } = require('apollo-server-express');

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {startStandaloneServer} = require('@apollo/server/standalone');

const {ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled} = require('apollo-server-core');

// graphql-http libraries
const { createHandler } = require('graphql-http/lib/use/express');
const expressPlayground = require('graphql-playground-middleware-express').default;

const {typeDefs,resolvers} = require('./src/graphql/index.graphql');
// const { graphQlSchema } = require('./src/graphql/index.graphql');
// const {typeDefs} = require('./src/graphql/method2/typeDefs/post.type');
// const {typeDefs} = require('./src/graphql/method2/typeDefs/index.type');
// const {resolvers} = require('./src/graphql/method2/resolvers/post.resolver');
// const {resolvers} = require('./src/graphql/method2/resolvers/index.resolvers');
// const { graphQlSchemaM2 } = require('./src/graphql/method2/index.graphql.m2');

const app = express();


class Application{

    constructor(){
        this.setupExpress();
        this.setupMongoDB();
        // this.setupGraphQlUsingGraphqlHTTP();
        // this.setupGraphQlUsingApolloServerExpress();
        // this.setupGraphQlUsingApolloServerStandalone();
        this.setConfigs(app);
        this.setEJS(app);
        this.setRoutes(app);
        this.setupSwagger(app);  // Swagger makes the building slow

        // Initialize GraphQl and Error handling in this way to prevent conflict of them
        (async ()=>{
            await this.setupGraphQlUsingApolloServer();
            this.setErrorHandlers(app);  // setErrorHandlers must invoke after await server.start(), otherwise it makes problem in reach graphql route
        })()
    }

    
    async setupExpress(){
        const port = process.env.PORT || 3000;

        app.listen(port, async ()=>{
            console.log(`Server is running on port ${port}`, `http://localhost:${port}`);
        })
    }

    async setupGraphQlUsingApolloServer(){
        // Method 4 using @apollo/server
        // it has much in common with Apollo-server-express
        const server = new ApolloServer({
            // schema: graphQlSchemaM2,
            typeDefs,
            resolvers,
            plugins: [
                ApolloServerPluginLandingPageGraphQLPlayground
            ]
        });

        await server.start()
        
        app.use('/graphql',cors({origin:"*"}), expressMiddleware(server,{
            context: ({req})=>{
                return {req}
            }
        }));

        // Specify the path where we'd like to mount our server
        //highlight-start

        // setErrorHandlers must invoke after await server.start(), otherwise it makes problem in reach graphql route
        // this.setErrorHandlers(app)
    }

    async setupGraphQlUsingGraphqlHTTP(){
        // Method 3 graphql-http - it provide basic graphql
        // using graphql-playground-middleware-express for Graphql Playground
        app.use(
            '/graphql',
            cors(),
            createHandler({
                schema: graphQlSchema,
                context: ()=>{
                    return {x : "Reza Magazine"}
                }
            })
            )

        // Set a playground route to send request through graphql route
        app.get('/playground', expressPlayground({endpoint: '/graphql'}));
    }

    async setupGraphQlUsingApolloServerExpress(){
        // Method 2 apollo-server-express
        // Create an Apollo Server instance with your schema and resolvers
        let server = new ApolloServerExpress({ schema: graphQlSchema, csrfPrevention:true, plugins:[
            ApolloServerPluginLandingPageGraphQLPlayground(),
            ApolloServerPluginLandingPageDisabled()
        ], introspection: true, playground: true});

        await server.start();
        console.log(`GraphQL address: ${server.graphqlPath}`);

        // Apply the Apollo Server middleware to Express
        server.applyMiddleware({app});

        // It uses @apollo/server/express4
        // app.use('/graphql',cors(), express.json(),expressMiddleware(server));   

        // setErrorHandlers must invoke after await server.start(), otherwise it makes problem in reach graphql route
        // this.setErrorHandlers(app)
    }

    async setupGraphQlUsingApolloServerStandalone(){
        // method 1 @apollo/server/standalone
        let server = new ApolloServer({ schema: graphQlSchema,
                        
            csrfPrevention: true,
            plugins:[
            ApolloServerPluginLandingPageGraphQLPlayground(),
            ApolloServerPluginLandingPageDisabled()],
            instrospection: true,
            playground: true
        });

        const {url} = await startStandaloneServer(server,{listen:{port:4000}})
        console.log(`🚀 Server ready at ${url}`)

        // setErrorHandlers must invoke after await server.start(), otherwise it makes problem in reach graphql route
        // this.setErrorHandlers(app)
    }

    setupMongoDB(){
        require('./src/config/mongoose.config');
    }

    setupSwagger(app){
        const swaggerDocument = require('./src/config/swagger.config');
        app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
    }

    async setRoutes(app){
        app.use(routes);
    }

    setErrorHandlers(app){
        notFoundHandler(app);
        allExceptionHandler(app);
    }

    setConfigs(app){
        app.use(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
        app.use(this.#sessionOptions);
        app.use(flash());
        app.use(express.static('public'))
    }

    setEJS(app){
        app.use(expressEjsLayouts);
        app.set('view engine','ejs')
        app.set('layout','./layouts/panel/main.ejs')
        app.set('layout extractScripts', true)
        app.set('layout extractStyles', true)
        app.locals.moment = moment;
    }

    #sessionOptions = session({
        secret: process.env.SESSION_SECRET_KEY,
        store: connectMongo.create({mongoUrl: process.env.MONGODB_URL}),
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
    })
}

module.exports = {
    Application: new Application()
};