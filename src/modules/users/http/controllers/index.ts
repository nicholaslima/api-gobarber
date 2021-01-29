
import { Response,Request } from 'express';
import createUserService from '../../services/createUserService';
class userController{

    public async create(request: Request,response: Response){

        const { name, email,password } = request.body;

        const service = new createUserService();

        const user = await service.execute({name, email,password});
        
        return response.json(user);
    }
}


export default userController;