
import { Request,Response,NextFunction } from 'express';
import UserAuthService from '../../services/authUserService';


class SessionsController{

    public async auth(request: Request, response: Response,next: NextFunction){

        const { password,email } = request.body;

        const service =  new UserAuthService();

        const { user,token } = await service.execute({email,password});

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            update_at: user.update_at,
        }

        return response.json({
            userWithoutPassword,
            token,
        });
    }
}


export default SessionsController;