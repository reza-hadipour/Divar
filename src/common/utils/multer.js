const multer = require('multer');
const path = require('path');
const {randomInt} = require('crypto');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        let dir = getDirPath();
        fs.mkdirSync(dir,{recursive:true});
        cb(null,dir);
    },
    filename: async function(req,file,cb){
        let now = new Date();
        const filename = "ads_" + (file.originalname.substring(0,file.originalname.length - 4)).trim() + "_" + randomInt(11111,99999) + path.extname(file.originalname);
        cb(null, filename);
    }
})

const arrayFileFilter = (req,file,cb)=>{
    const witheExtList = ['.jpg','.jpeg','.png','.webp'];
    if( witheExtList.includes(path.extname(file.originalname).toLowerCase())){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

function getDirPath(){
    const date = new Date();
    const year = date.getFullYear()+"";
    const month = date.getMonth()+1+"";
    const day = date.getDate()+"";
    // console.log('make directory');
    return `./public/upload/images/${year}/${month}/${day}`;
}

// const upload = multer({storage, fileFilter: arrayFileFilter})
// const upload = multer({dest:'uploads/'})
const upload = multer({storage})

module.exports = { upload }