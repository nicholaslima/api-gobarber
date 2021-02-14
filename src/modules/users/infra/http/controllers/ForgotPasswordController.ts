
import SendResetEmailService from '@modules/users/services/sendResetEmailService';
import { Request,Response } from 'express';
import { container } from 'tsyringe';

class ForgotPasswordController{

    public async create(request: Request,response: Response){
        
       const { email } = request.body;
       
       const sendResetEmail = container.resolve(SendResetEmailService);

       await sendResetEmail.execute({ email });

       return response.status(204).json();
    }

}

export default ForgotPasswordController;