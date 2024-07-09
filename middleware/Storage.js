    import multer from "multer";

    const guardar = multer.diskStorage({
        filename: (req,file,cb) =>{
            if(file !== null){
                cb(null,file.originalname)

            }
        }
    })

    const filtro = (req,file,cb) => {
        if(file && (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')) {
            cb(null,true)
        }
        else {
            cb(null,false)
        }
    }
    
    export const subirImagen = multer({storage: guardar, fileFilter:filtro})