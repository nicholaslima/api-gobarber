
import ISendResetEmailProvider from '../models/ISendResetEmailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';


class FakeSendResetEmail implements ISendResetEmailProvider{

    private emails: ISendMailDTO[] = [];

    public async sendEmail(message: ISendMailDTO){

        this.emails.push(message);
    }
}

export default FakeSendResetEmail;