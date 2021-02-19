
import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname,'..','tmp');
const uploadFolder = path.resolve(tmpFolder,'uploads');

export default {
    tmpFolder,
    uploadFolder,
    storage: multer.diskStorage({
        destination: tmpFolder, 
        filename:( request,file,callback) => {
            const hash = crypto.randomBytes(10).toString('hex');
            const name = `${ hash }-${ file.originalname }`;
            return callback(null,name);
        }
    })
}