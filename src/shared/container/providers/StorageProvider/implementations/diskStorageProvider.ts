
import IStorageProvider from '../model/IStorageProvider';
import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';


class DiskStorageProvider implements IStorageProvider{
    
    public async saveFile(filename: string): Promise<string>{
        fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder,filename),
            path.resolve(uploadConfig.uploadFolder,filename)
        );

        return filename;
    }

   public async  deleteFile(filename: string){

        const pathFolder =  path.resolve(uploadConfig.tmpFolder,filename);

        try{
            await fs.promises.stat(pathFolder)
        }catch{
            return;
        }

        await fs.promises.unlink(pathFolder);
   }
}

export default DiskStorageProvider;