
import ResetPasswordService from '@modules/users/services/resetPasswordService';
import { Request,Response} from 'express';

import {  container } from 'tsyringe';

class ResetEmailcontroller {


    public async create(request: Request,response: Response){

        const { token,password } = request.body;
        const resetPassword = container.resolve(ResetPasswordService);

        resetPassword.execute({token,password});

        return response.status(204).json();
    }
}


export default ResetEmailcontroller;