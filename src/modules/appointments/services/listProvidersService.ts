

import IUsersRepositories from '@modules/users/repositories/IUsersRepositories';
import IfindAllProvidersDTO from '@modules/users/dto/IfindAllProvidersDTO';
import User from '@modules/users/infra/typeorm/entities/User';

import { injectable,inject } from 'tsyringe';


@injectable()
class ListProvidersService{
    constructor(
        @inject('UsersRepository')
        private UsersRepository: IUsersRepositories,
    ){}

    public async execute({ expect_user_Id  } :IfindAllProvidersDTO): Promise<User[]> {
        
       const users = await this.UsersRepository.findAllProviders({expect_user_Id});

       return users;    
    }
}


export default ListProvidersService;