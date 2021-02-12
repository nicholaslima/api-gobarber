


import createUSerDTO from '@modules/users/dto/createUSerDTO';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUsersRepositories';
import IHashProvider from '@modules/users/providers/Hashprovider/models/IHashProvider';
import { inject,injectable } from 'tsyringe';

@injectable()
class CreateUSerService{

    constructor(
         @inject('UsersRepository')
         private usersRepository: IUserRepository,

         @inject('HashProvider')
         private HashProvider: IHashProvider,
     ){}

    public async execute({ name,password,email }: createUSerDTO): Promise<User>{

       const userExist = await this.usersRepository.findByEmail(email);

       if(userExist){
            throw new AppError('this email already exist');
       }

       const passwordHashed = await this.HashProvider.generateHash(password);
      
       const user = await this.usersRepository.register({
            name,
            password: passwordHashed,
            email 
       });
       
       return user;
    }
}

export default CreateUSerService;