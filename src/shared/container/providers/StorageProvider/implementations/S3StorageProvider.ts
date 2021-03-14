
import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import aws,{ S3 } from 'aws-sdk';
import mime from 'mime';


import IStorageProvider from '../model/IStorageProvider';

class S3StorageProvider implements IStorageProvider{
    private client: S3;

    constructor(){
        this.client = new aws.S3({
            region: 'us-east-1',
        });
    }

    public async saveFile(fileName: string): Promise<string>{
        const pathFile = path.resolve(uploadConfig.tmpFolder,fileName);
        const fileContent = await fs.promises.readFile(pathFile);
        const ContentType = mime.getType(pathFile);

        if(!ContentType){
            throw new Error('File not found');
        }

        await this.client
            .putObject({
                Bucket: uploadConfig.config.aws.bucket,
                Key: fileName,
                ACL: 'public-read',
                Body: fileContent,
                ContentType,
            })
            .promise();

        await fs.promises.unlink(pathFile);

        return fileName;
    }

    public async deleteFile(filename: string){
        await this.client.deleteObject({
            Bucket: uploadConfig.config.aws.bucket,
            Key: filename,
        })
        .promise();
    }
}

export default S3StorageProvider;