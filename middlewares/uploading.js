import {dirname} from 'path' 
import path from 'path'
import multer from 'multer'
import sharp from 'sharp'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname + 'photos/images'))
    },
    filename:function(req,file,cb){
        const unqname = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null,file.fieldname + '-' + unqname + '.jpeg')
    }
})

const filterfiles = (req,file,next)=>{
    if(req.file.mimetype.startsWith('images')) cb(null,true)
    else{
        cb({
            message:"Unsupported file types"
        })
    }
}

const uploadfileimg = multer({
    storage:store,
    filter:filterfiles,
    limits:{fileSize:20000}
})

const filterimagesize =async (req,res,next)=>{
    if(!req.files) next()
    await Promise.all(req.files.map(async(file)=>{
        await sharp(file.filename).resize(300,300).toFormat('.jpeg').jpeg({quality:90}).toFile(`photos/images/${file.filename}`)
    }))
}

const uploader = async(req,res,next)=>{
    if(!req.files) next()
    const upload = (path)=> cloudinaryUploadImg(path)

    const urls = []
    const files = req.files

    for(const file of files){
        const {path} = file 
        const newpath = await upload(path)
        urls.push(newpath)
        fs.unlinkSync(path)
    }
    const images = urls.map(file=>{return file})
    res.json(images)
}