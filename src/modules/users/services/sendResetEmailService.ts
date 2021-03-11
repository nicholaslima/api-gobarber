
import { injectable,inject} from 'tsyringe';
import IsendResetEmailPovider from '@shared/container/providers/sendResetEmail/models/ISendResetEmailProvider';
import IUSersRepository from '@modules/users/repositories/IUsersRepositories';
import AppError from '@shared/errors/AppError';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepositories';
import path from 'path';


interface sendResetEmailType{
    email: string;
}

@injectable()
class SendResetEmailService{

    constructor(
        @inject('UsersRepository')
        private USersRepository: IUSersRepository,
        
        @inject('SendResetEmailProvider')
        private sendEmailResetProvider: IsendResetEmailPovider,

        @inject('UsersTokenRepository')
        private UsersTokenRepository: IUsersTokenRepository,
    ){}

    public async execute({ email }: sendResetEmailType){

        const userFound = await this.USersRepository.findByEmail(email);

        if (!userFound){
            throw new AppError('this user not exist');
        }

        const { token } = await this.UsersTokenRepository.generateToken(userFound.id);

        const pathTemplate = path.resolve(__dirname,'..','views','templateMail.hbs');
        

        await this.sendEmailResetProvider.sendEmail({
            to: {
                name: userFound.name,
                email: userFound.email,
            },
            subject: '[Gobarber] Recuperação de senha',
            templateData:{
                variables:{
                    name: userFound.name,
                    link:`${ process.env.APP_WEB_URL }/reset_password?token=${ token }`,
                },
                file: pathTemplate,
            },
        });
    }
}


export default SendResetEmailService;