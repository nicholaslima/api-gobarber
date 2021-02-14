
import ISendEmailResetProvider from '../models/ISendResetEmailProvider';
import nodemailer,{ Transporter } from 'nodemailer';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import { inject,injectable } from 'tsyringe';

@injectable()
class sendResetEmail implements ISendEmailResetProvider{

    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private MailTemplateProvider: IMailTemplateProvider,
    ){
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

    public async sendEmail({from,to,subject,templateData }: ISendMailDTO){
        const message = await this.client.sendMail({
             from:{
                 name: from?.name || 'Equipe Gobarber',
                 address: from?.email || 'equipe@gobarber.com.br'
             },
             to: {
                 name: to.name,
                 address: to.email,
             },
             subject,
             html: await this.MailTemplateProvider.parse(templateData),
         });
         
         console.log('message sent:',message.messageId);
         console.log('preview url:',nodemailer.getTestMessageUrl(message));
    }
}


export default sendResetEmail;