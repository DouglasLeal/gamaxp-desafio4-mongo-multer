import multer from "multer";

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {

            cb(null, './public/img/')
        },
        filename: function (req, file, cb) {
            const extensaoArquivo = file.originalname.split('.')[1];

            const novoNomeArquivo = `${file.originalname.split('.')[0]}-${Date.now()}`

            cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)

        }
    });

const upload = multer({ storage });

export default upload;