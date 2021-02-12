
import ISendEmailResetProvider from '../models/ISendResetEmailProvider';
import nodemailer,{ Transporter } from 'nodemailer';


class sendResetEmail implements ISendEmailResetProvider{

    private client: Transporter;

    constructor(){
        nodemailer.createTestAccount().then( account => {
            const transporter = nodemailer.createTransport({ 
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                }
            });

            this.client = transporter;
        })

    }

    public async sendEmail(to: string,body: string){
        const message = await this.client.sendMail({
             from:'Equipe GoBarber <equipe@goBaber.com>',
             to,
             subject: 'Recuperação de senha',
             text: body
         });
         
         console.log('message sent:',message.messageId);
         console.log('preview url:',nodemailer.getTestMessageUrl(message));
    }
}


export default sendResetEmail;