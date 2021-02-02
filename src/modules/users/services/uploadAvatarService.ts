

import UploadAvatarDTO from '../dto/uploadAvatarDTO';

import uploadConfig from '../config/upload';
import IUsersRepository from '@modules/users/repositories/IUsersRepositories';
import User from '../infra/typeorm/entities/User';
import fs from 'fs';
import path from 'path';
import { inject,injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

@injectable()
class UploadAvatarService{

    constructor(
        @inject('UsersRepository')
        private ormRepository :IUsersRepository
    ){}

    public async execute({ filename,userID }: UploadAvatarDTO):Promise<User>{

        const user = await this.ormRepository.findById(userID);

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

        await this.ormRepository.update(user);
        return user;
    }
}

export default UploadAvatarService;