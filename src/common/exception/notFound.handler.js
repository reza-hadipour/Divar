module.exports = function notFoundHandler(app){
    app.use((req,res,next)=>{
        res.status(404).json({
            message: "Not Found Route"
        })
    })

    // Another way to prevent conflict of error handling and GraphQl path
    // app.use((req,res,next)=>{
    //     if(req.path == '/graphql'){
    //         next();
    //     }else{
    //         res.status(404).json({
    //             message: "Not Found Route"
    //         })
    //     }
    // })
}