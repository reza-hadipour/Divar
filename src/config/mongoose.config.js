const {default: mongoose} = require('mongoose');

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Connected to MongoDB Successfully.");
}).catch(err => {
    console.log(err?.message ?? "Failed to Connect MongoDB.");
    process.exit(0);
})