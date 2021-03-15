

import IUsersRepository from '@modules/users/repositories/IUsersRepositories';
import { injectable,inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import UpdateUserDTO from '@modules/users/dto/UpdateUserDTO';
import IHashProvider from '@modules/users/providers/Hashprovider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';

@injectable()
class UpdateUserService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private HashProvider: IHashProvider,
    ){}

    public async execute({user_id,name,password,email,old_password}:UpdateUserDTO): Promise<User>{
        const user = await this.usersRepository.findById(user_id);

        if(!user){
            throw new AppError('user does not exist');
        };

        const userFound = await this.usersRepository.findByEmail(email);

        if(userFound && userFound.id !== user_id){
            throw new AppError('this email already exist');
        };

        Object.assign(user,{
            name,
            email
        });

        if(password && !old_password) {
            throw new AppError(
              'You need to inform old password to set a new password.',
            );
        };


        if(password && old_password){
           const passwordCorrect =  await this.HashProvider.compareHash(
               old_password,
               user.password
            );

            if(!passwordCorrect){
                throw new AppError('old password does not match ');
            }

            user.password = await this.HashProvider.generateHash(password);
        }

        if(!password && old_password) {
            throw new AppError(
              'You need to inform new password to update your password',
            );
        };


        return this.usersRepository.update(user);
    }

}

export default UpdateUserService;