import multer from 'multer'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);












/*
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const __dirname = dirname(__filename)


const store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname),'../images/photos')
    },
    filename:function(req,file,cb){
        const unqname = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null,file.fieldname + '-' + unqname + '.jpeg')
    }
})

const filter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }
}


const uploadImg = multer({
    storage: storedisk,
    filter:filter,
    limits:{fieldsize:2000000}
})

const resizeImage = (req,res,next)=>{
    if(!req.files) next()
    await Promise.all(
        req.files.map((file)=>{
            sharp(file.filename).resize(300,300).toFormat('jpeg').jpeg({quality:90}).file('filepathdesitnatinowithfilename')
        })
    )
}


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__dirname)

*/






















const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg');
    }
});

const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb({
            message:"Unsupported file format"
        },false)
    }
}

/* 
photo uploaded path to store 

first try to store in the disk create a folder for storing images 

const diskstore = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'../public/images'))
    }
})


next try to create a unq name for the file to store in the storage space you stored

const diskstore = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname , '..public/images'))
    },
    filename:function(req,file,cb){
        const unqname = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null,file.fieldname + '-' + unqname + '.jpeg')
    }
})

next try to filter those files only images 

const fileterimages = (req,file,cb)=>{
    if(file.mimetype.startWith('images')){
        cb(null,true)
    }
    else{
        cb({
            message:"File not supported"
        },false)
    }
}

set the size limit for the file 
const uploadphoto = multer({
    storage:diskstore,
    filter:filterimages,
    limits:{fieldSize:200000000}
})

*/

const uploadPhoto = multer({
    storage:multerStorage,
    fileFilter:multerFilter,
    limits:{fieldSize:2000000}
})

export const productImgResize = async (req,res,next)=>{
    if(!req.files) return next()
    await Promise.all(
        req.files.map(async(file)=>{
            await sharp(file.path).resize(300,300).toFormat('jpeg').jpeg({quality:90}).toFile(`public/images/products/${file.filename}`)
            fs.unlinkSync(`public/images/products/${file.filename}`)
        })
)
next()
}

export const blogImgResize = async (req,res,next)=>{
    if(!req.files) return next()
    await Promise.all(
        req.files.map(async(file)=>{
            await sharp(file.path).resize(300,300).toFormat('jpeg').jpeg({quality:90}).toFile(`public/images/blogs/${file.filename}`)
            fs.unlinkSync(`public/images/blogs/${file.filename}`)
        })
)
next()
}




export default uploadPhoto