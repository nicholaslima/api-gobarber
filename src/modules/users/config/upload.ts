
import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const pathFile = path.resolve(__dirname, '..','..','..','tmp');

export default {
    directory: pathFile,
    storage: multer.diskStorage({
        destination: pathFile, 
        filename:( request,file,callback) => {
            const hash = crypto.randomBytes(10).toString('hex');
            const name = `${ hash }-${ file.originalname }`;
            return callback(null,name);
        }
    })
}