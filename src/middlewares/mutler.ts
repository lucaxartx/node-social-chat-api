import multer from 'multer'

//multer setup
const multerStorage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, './uploads/')
    },
    filename: (_req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        cb(null, `${Date.now()}.${ext}`)
    },
})

const upload = multer({ storage: multerStorage })

export default upload