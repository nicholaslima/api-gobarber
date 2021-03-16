


import { Request,Response } from 'express';
import ListProviderDaysAvaibilityService from '@modules/appointments/services/ListProviderDaysAvaibilityService';
import { container } from 'tsyringe';

class ProvidersDayAvaibilityController{

    public async index(request: Request,response: Response){
        const { provider_id } = request.params;
        const { month,year,day } =  request.query;
        
        const listAvaibility =  container.resolve(ListProviderDaysAvaibilityService);
       
        const avaibilities = await listAvaibility.execute({ 
            provider_id,
            day: Number(day),
            year: Number(year),
            month: Number(month)
        });
    

        return response.status(200).json(avaibilities);
    }


}

export default ProvidersDayAvaibilityController;