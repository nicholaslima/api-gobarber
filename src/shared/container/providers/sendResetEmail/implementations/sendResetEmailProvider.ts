
import ISendEmailResetProvider from '../models/ISendResetEmailProvider';

class sendResetEmail implements ISendEmailResetProvider{

    public async sendEmail(to: string,body: string){

    }
}


export default sendResetEmail;