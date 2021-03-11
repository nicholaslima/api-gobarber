


import { Request,Response } from 'express';
import ListProviderDaysAvaibilityService from '@modules/appointments/services/ListProviderDaysAvaibilityService';
import { container } from 'tsyringe';

class ProvidersDayAvaibilityController{

    public async index(request: Request,response: Response){
        const { provider_id } = request.params;
        const { month,year,day } =  request.body;
        
        const listAvaibility =  container.resolve(ListProviderDaysAvaibilityService);
       
        const avaibilities = await listAvaibility.execute({ 
            day,
            month,
            provider_id,
            year
        });
    

        return response.status(200).json(avaibilities);
    }


}

export default ProvidersDayAvaibilityController;