
import ResetPasswordDTO from '@modules/users/dto/ResetPasswordDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepositories';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepositories';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/Hashprovider/models/IHashProvider';
import { isAfter,addHours } from 'date-fns';
import { inject,injectable } from 'tsyringe';

@injectable()
class ResetPasswordService {

    constructor(
        @inject('UsersTokenRepository')
        private usersTokenRepository: IUsersTokenRepository,

        @inject('UsersRepository')
        private userRepository: IUsersRepository,

        @inject('HashProvider')
        private HashProvider: IHashProvider,
    ){}

    public async execute({ token,password }: ResetPasswordDTO){
       const userTokenFound = await this.usersTokenRepository.findUser(token);

       if(!userTokenFound){
           throw new AppError('this user has not valid token');
       }

       const user = await this.userRepository.findById(userTokenFound.user_id);
    
       if(!user){
            throw new AppError('this user does not exist');
       }

       const tokenCreatedAt = userTokenFound.created_at;
       const compareDate = addHours(tokenCreatedAt,2);

       if(isAfter(Date.now(),compareDate)){
           throw new AppError('token expired');
       }

       const passwordHashed = await this.HashProvider.generateHash(password);

       user.password = passwordHashed;

       this.userRepository.update(user);
    }}

export default ResetPasswordService;