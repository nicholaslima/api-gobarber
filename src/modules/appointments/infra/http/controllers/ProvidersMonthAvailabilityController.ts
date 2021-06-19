
import { Request,Response } from 'express';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import { container } from 'tsyringe';

class ProvidersMonthAvailabilityController{

    public async index(request: Request,response: Response){
        const { provider_id } = request.params;
        const { month,year } =  request.query;

        const listAvaibility =  container.resolve(ListProviderMonthAvailabilityService);
       
        const avaibilities = await listAvaibility.execute({ 
            provider_id,
            year: Number(year),
            month: Number(month)
        });

        return response.status(200).json(avaibilities);
    }


}

export default ProvidersMonthAvailabilityController;