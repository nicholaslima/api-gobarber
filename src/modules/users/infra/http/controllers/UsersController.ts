
import { Response,Request } from 'express';
import { classToClass } from 'class-transformer';
import createUserService from '@modules/users/services/createUserService';
import UploadAvatarService from '@modules/users/services/uploadAvatarService';
import { container } from 'tsyringe';

class userController{

    public async create(request: Request,response: Response){

        const { name,email,password } = request.body;

        const createUser = container.resolve(createUserService);

        const user = await createUser.execute({ name,email,password });


        return response.json(classToClass(user));
    }

    public async UploadAvatar(request: Request,response: Response){
        const { filename } = request.file;
        const { id  } = request.user;

        const updateAvatar = container.resolve(UploadAvatarService);
       
        const user = await updateAvatar.execute({ 
           filename,
           userID: id 
        });

        return response.json(classToClass(user));
    }

}


export default userController;