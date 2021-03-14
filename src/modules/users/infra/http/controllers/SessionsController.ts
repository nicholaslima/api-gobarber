
import { Request,Response,NextFunction } from 'express';
import { classToClass  } from 'class-transformer';
import UserAuthService from '@modules/users/services/authUserService';
import { container } from 'tsyringe';

class SessionsController{

    public async auth(request: Request, response: Response,next: NextFunction){
        const userAuthService = container.resolve(UserAuthService);

        const { password,email } = request.body;

        const { user,token } = await userAuthService.execute({email,password});
        
        return response.json({
            user: classToClass(user),
            token,
        });
    }
}


export default SessionsController;