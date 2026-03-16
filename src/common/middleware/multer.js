import multer from "multer";
import fs from "fs";

export let multer_local = ({customPath , allowedExtensions , maxSize} = {customPath : "general" , maxSize : 5})=>{
    let storage = multer.diskStorage({
        destination : function ( req , file , cb){
            let uploadPath = `uploads/${customPath}`
            if(!fs.existsSync(uploadPath)){
                fs.mkdirSync(uploadPath , {recursive : true})
            }
            cb(null , uploadPath)  
        },
        filename : function (req, file, cb){
            let prefix = Date.now()
            let fileName  = `${prefix}-${file.originalname}`
            cb(null , fileName)
        }
    });

    let fileFilter = function (req, file, cb) {
        if(!allowedExtensions.includes(file.mimetype)){
            return cb(new Error("Invalid file type"), false);
        }
        cb(null, true);
      };

    return multer({storage, fileFilter , limits : {fileSize : maxSize * 1024 * 1024}});
}