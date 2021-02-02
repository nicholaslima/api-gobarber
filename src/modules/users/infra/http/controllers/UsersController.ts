
import { Response,Request } from 'express';
import createUserService from '@modules/users/services/createUserService';
import UploadAvatarService from '@modules/users/services/uploadAvatarService';
import { container } from 'tsyringe';

class userController{

    public async create(request: Request,response: Response){

        const { name,email,password } = request.body;

        const createUser = container.resolve(createUserService);

        const user = await createUser.execute({ name,email,password });

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

        const updateAvatar = container.resolve(UploadAvatarService);

        const user = await updateAvatar.execute({ 
           filename,
           userID: id 
        });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            created_at: user.created_at,
            update_at: user.update_at,
       };

        return response.json(userWithoutPassword);
    }

}


export default userController;