
import ISendResetEmailProvider from '../models/ISendResetEmailProvider';


interface EmailType{
    to: string;
    body: string;
}
class FakeSendResetEmail implements ISendResetEmailProvider{

    private emails: EmailType[] = [];

    public async sendEmail(to: string,body: string){
        const email = { to,body };
        this.emails.push(email);

    }
}

export default FakeSendResetEmail;