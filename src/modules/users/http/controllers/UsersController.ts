
import { Response,Request } from 'express';
import createUserService from '../../services/createUserService';
import UploadAvatarService from '../../services/uploadAvatarService';

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

    public async UploadAvatar(request: Request,response: Response){
        const { filename } = request.file;
        const { id  } = request.user;

        const service = new UploadAvatarService();

       const user = await service.execute({ 
           filename,
           userID: id 
        });

        return response.json(user);
    }

}


export default userController;