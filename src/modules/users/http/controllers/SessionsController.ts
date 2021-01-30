
import { Request,Response } from 'express';
import UserAuthService from '../../services/authUserService';


class SessionsController{

    public async auth(request: Request, response: Response){

        const { password,email } = request.body;

        const service =  new UserAuthService();

        const {user,token} = await service.execute({email,password});

        const userWithoutEmail = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            update_at: user.update_at,
        }

        return response.json({
            userWithoutEmail,
            token,
        });
    }
}


export default SessionsController;