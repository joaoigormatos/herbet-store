import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const destination = process.env.UPLOADS_LOCATION;

const storageEngine = multer.diskStorage({
    destination: destination,
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
});

const upload = multer({
    storage: storageEngine,
    fileFilter: (req, file, callback) => {
      const fileExtention = path.extname(file.originalname);
      if (fileExtention !== '.png' && fileExtention!='.jpg') {
        return callback(new Error('Only images or pdf files are allowed'));
      }
      return callback(null, true);
    },
    limits: {
      fileSize: 10 * 1024 * 1024, //10 MB
    },
  });
  export default {
      destination : destination,
      
      upload : upload,
      fileErrorHandler : (err, req, res, next) => {
        if (err instanceof multer.MulterError) return multer.MulterError();
        response.json({
          status: 404,
          message: err.message,
        });
        next();
      }

}
  