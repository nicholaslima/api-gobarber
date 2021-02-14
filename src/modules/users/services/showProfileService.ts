

import IusersRepository from '@modules/users/repositories/IUsersRepositories';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

import { injectable,inject } from 'tsyringe';


@injectable()
class ShowProfileService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IusersRepository,
    ){}
    public async execute(user_id: string): Promise<User>{
        const user = await this.usersRepository.findById(user_id);

        if(!user){
            throw new AppError('this user does not extist');
        };

        return user;
    }
}


export default ShowProfileService;