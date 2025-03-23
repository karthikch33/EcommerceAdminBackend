import cloudinaryUploadImg,{cloudinaryDeleteImg} from '../utils/cloudinary.js'
import fs from 'fs'
import asyncHandler from 'express-async-handler'

export const uploadImages = asyncHandler(async(req,res)=>{
    try {
        const uploader = (path)=>cloudinaryUploadImg(path,"images")
        const urls = []
        const files = req.files
        console.log(files)
        for(const file of files){
            const {path} = file;
            const newpath = await uploader(path)
            urls.push(newpath)
            fs.unlinkSync(path)
        }
        const images = urls.map(file=>{return file})
        res.json(images)
        
    } catch (error) {
        throw new Error(error)
    }
})



/*

const uploadImages = (req,res)=>{
    const uploader =(path)=> cloudinaryUploadImg(path)
    const files = req.files
    const urls = []
    for(const file of files){
        const {path} = file 
        const newpath = await uploader(path)
        urls.push(newpath)
        fs.unlinkSync(path)
    }
}

*/

// delete Images

export const deleteImages = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
        const deleteImage = await cloudinaryDeleteImg(id,'images')
        res.json({message:"Deleted"})
       
    } catch (error) {
        throw new Error(error)
    }
})

/*
first admin and authmiddleware 
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(filename)

const store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/images))
    },
    filename:function(req,file,cb){
        const unqname = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null,file.fieldname + '-' + unqname + '.jpeg')
    }
})


const filter = (req,res,next)=>{
    if(file.mimetype.startsWith('images')) cb(null,true)
    cb({
        message:"unsupported Files type"
    })
}

const uploadImage = multer({
    storage:store,
    filter:filter,
    limits:{fieldSize:200000}
})

const resizeImage = (req,res)=>{
    if(!req.files) next()
    await Promise.all(
        req.files.map((file)=>{
            await sharp(file.filename).resize(300,300).toFormat('jpeg').jpeg({quality:90}).file(filepathdestination)
        })
    )
}

const uploadcloud = (req,res)=>{
    const uploader = (path)=>cloudinaryUplaodImg(path)
    const files = req.files
    const url = []
    for(const file of files){
        const {path} = file
        const newpath = await uploader(file)
        urls.push(path)
        fs.unlinkSync(path)
    }
    const images = urls.map(file=> return file)
    res.json(images)
}


*/