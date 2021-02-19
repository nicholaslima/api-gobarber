

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

    public async execute({ except_user_id  } :IfindAllProvidersDTO): Promise<User[]> {
        
       const users = await this.UsersRepository.findAllProviders({except_user_id});

       return users;    
    }
}


export default ListProvidersService;