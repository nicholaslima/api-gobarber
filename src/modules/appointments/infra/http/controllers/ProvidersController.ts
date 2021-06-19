
import { Response,Request } from 'express';
import listProvidersService from '@modules/appointments/services/listProvidersService';
import { container  } from 'tsyringe';
import { classToClass } from 'class-transformer';


class ProvidersController{

    public async listProviders( request:Request, response:Response ){
        const { id } = request.user;    

        const listProviders = container.resolve(listProvidersService);

        const providers =  await listProviders.execute({ except_user_id: id });

        return response.status(200).json(classToClass(providers));
    }
}

export default ProvidersController;