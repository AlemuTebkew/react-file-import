const multer=require('multer');

const fileStorage=multer.diskStorage({
    destination:(req:Request,file:any,cb:any)=>{
      cb(null,'uploads')
    },
    filename:(req:Request,file:any,cb:any)=>{
    //  cb(null, `${Math.floor(Math.random()*1000)} - ${file.originalname}`)
      cb(null, `${new Date().getTime()}-${file.originalname}`)
    } 
});
const fileFilter=(req:Request,file:any,cb:any)=>{
      if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        cb(null,true)
      }else{
        cb(null,true)
      }

}
      const upload=multer({storage:fileStorage}).single('file')
                                          //.single('image')//a middleware for encodding multipart/form-data

module.exports=upload