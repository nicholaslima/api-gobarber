

import UploadAvatarDTO from '../dto/uploadAvatarDTO';
import userRepository from '../infra/typeorm/repository/UserRepository';
import uploadConfig from '../config/upload';
import User from '../infra/typeorm/entities/User';
import fs from 'fs';
import path from 'path';

import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';

class UploadAvatarService{

    public async execute({ filename,userID }: UploadAvatarDTO):Promise<User>{
        const repository = getCustomRepository(userRepository);

        const user = await repository.findOne({ 
            where: { id: userID }
        });

        if(!user){
            throw new AppError('usuario não existe');
        }

        if(user.avatar){
           const pathFile =  path.join(uploadConfig.directory,user.avatar);
           const FileExist = await fs.promises.stat(pathFile);
           
           if(FileExist){
               await fs.promises.unlink(pathFile);
           }
        }

        user.avatar = filename;

        await repository.save(user);
        return user;
    }
}

export default UploadAvatarService;