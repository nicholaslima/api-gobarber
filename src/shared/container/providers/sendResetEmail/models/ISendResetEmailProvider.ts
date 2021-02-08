
interface IsendResetEmail{
    sendEmail(to: string,body: string): Promise<void>;
}

export default IsendResetEmail;