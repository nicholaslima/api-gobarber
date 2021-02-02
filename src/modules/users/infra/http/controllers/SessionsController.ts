
import { Request,Response,NextFunction } from 'express';
import UserAuthService from '@modules/users/services/authUserService';
import { container } from 'tsyringe';

class SessionsController{

    public async auth(request: Request, response: Response,next: NextFunction){
        const userAuthService = container.resolve(UserAuthService);

        const { password,email } = request.body;

        const { user,token } = await userAuthService.execute({email,password});
        
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