
import { Response,Request } from 'express';
import createUserService from '../../services/createUserService';
class userController{

    public async create(request: Request,response: Response){

        const { name,email,password } = request.body;

        const service = new createUserService();

        const user = await service.execute({name,email,password});

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            update_at: user.update_at,
       };

        return response.json(userWithoutPassword);
    }

}


export default userController;