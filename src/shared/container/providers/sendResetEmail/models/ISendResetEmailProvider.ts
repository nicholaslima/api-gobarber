import ISendMailDTO from '../dtos/ISendMailDTO';

interface IsendResetEmail{
    sendEmail(data : ISendMailDTO): Promise<void>;
}

export default IsendResetEmail;