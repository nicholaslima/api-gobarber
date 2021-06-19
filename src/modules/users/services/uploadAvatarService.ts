

import UploadAvatarDTO from '../dto/uploadAvatarDTO';

import IUsersRepository from '@modules/users/repositories/IUsersRepositories';
import IStorageProvider from '@shared/container/providers/StorageProvider/model/IStorageProvider';
import User from '../infra/typeorm/entities/User';

import { inject,injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

@injectable()
class UploadAvatarService{

    constructor(
        @inject('UsersRepository')
        private ormRepository :IUsersRepository,
        
        @inject('UploadProvider')
        private StorageProvider:IStorageProvider
    ){}

    public async execute({ filename,userID }: UploadAvatarDTO):Promise<User>{

        const user = await this.ormRepository.findById(userID);

        if(!user){
            throw new AppError('usuario não existe');
        }

        if(user.avatar){
           await this.StorageProvider.deleteFile(user.avatar);
        }


        const fileName = await this.StorageProvider.saveFile(filename);

        user.avatar = fileName;
        
        await this.ormRepository.update(user);

        return user;
    }
}

export default UploadAvatarService;