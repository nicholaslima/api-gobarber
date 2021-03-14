
import path from 'path';
import crypto from 'crypto';
import multer,{ StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname,'..','..','tmp');
const uploadFolder = path.resolve(__dirname,'..','..','tmp','uploads');


interface IUploadConfig{
    driver: 'disk' | 's3',

    tmpFolder: string,
    uploadFolder: string,

    multer:{
        storage: StorageEngine,
    },

    config:{
        disk:{},
        aws: {
            bucket: string,
        },
    },
};

export default { 
    driver: process.env.STORAGE_DRIVER,
    tmpFolder,
    uploadFolder,
    multer:{
        storage: multer.diskStorage({
            destination: tmpFolder, 
            filename:( request,file,callback) => {
                const hash = crypto.randomBytes(10).toString('hex');
                const name = `${ hash }-${ file.originalname }`;
                return callback(null,name);
            }
        })
    },
    config:{
        aws:{
            bucket: 'app-gobarbernc',
        }
    }
} as IUploadConfig;