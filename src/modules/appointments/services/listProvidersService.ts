

import IUsersRepositories from '@modules/users/repositories/IUsersRepositories';
import IfindAllProvidersDTO from '@modules/users/dto/IfindAllProvidersDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import { injectable,inject } from 'tsyringe';


@injectable()
class ListProvidersService{
    constructor(
        @inject('UsersRepository')
        private UsersRepository: IUsersRepositories,

        @inject('CacheProvider')
        private CacheProvider: ICacheProvider,
    ){}

    public async execute({ except_user_id  } :IfindAllProvidersDTO): Promise<User[]> {
        let users = await this.CacheProvider.recover<User[]>(
            `providers-list:${ except_user_id }`
        );

        if(!users){
            users = await this.UsersRepository.findAllProviders({
                except_user_id
            });
            
            await this.CacheProvider.save(
                `providers-list:${ except_user_id }`,users
            );
        }
        
        return users;    
    }
}


export default ListProvidersService;