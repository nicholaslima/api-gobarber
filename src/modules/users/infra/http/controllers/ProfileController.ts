
import { Request,Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer'
import ShowProfileService from '@modules/users/services/showProfileService';
import updateUserService from '@modules/users/services/updateUserService';

class ProfileController{

    public async show(request:Request,response: Response){
        const { id } = request.user;

        const showProfile = container.resolve(ShowProfileService);

        const User_profile = await showProfile.execute(id);

        return response.json(classToClass(User_profile));
    }

    public async update(request: Request,response: Response){
        const { id } = request.user;
        const { email,name,password,old_password } = request.body;

        const updateUser = container.resolve(updateUserService);

        const user = await updateUser.execute({
            user_id: id,
            email,
            name,
            old_password,
            password
        });

        return response.status(200).json(classToClass(user));
    }
}


export default ProfileController;