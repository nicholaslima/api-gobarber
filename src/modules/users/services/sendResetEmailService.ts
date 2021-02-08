
import { injectable,inject} from 'tsyringe';
import IsendResetEmailPovider from '@shared/container/providers/sendResetEmail/models/ISendResetEmailProvider';
import IUSersRepository from '@modules/users/repositories/IUsersRepositories';
import AppError from '@shared/errors/AppError';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepositories';


interface sendResetEmailType{
    email: string;
}

@injectable()
class SendResetEmailService{

    constructor(
        @inject('UsersRepository')
        private USersRepository: IUSersRepository,
        @inject('sendResetEmailProvider')
        private sendEmailResetProvider: IsendResetEmailPovider,
        @inject('usersTokenRepository')
        private UsersTokenRepository: IUsersTokenRepository,
    ){}

    public async execute({ email }: sendResetEmailType){

        const userFound = await this.USersRepository.findByEmail(email);

        if (!userFound){
            throw new AppError('this user not exist');
        }

        await this.UsersTokenRepository.generateToken(userFound.id);

        await this.sendEmailResetProvider.sendEmail(
            email,
            'confirma sua recuperação de senha'
        );

    }

}


export default SendResetEmailService;