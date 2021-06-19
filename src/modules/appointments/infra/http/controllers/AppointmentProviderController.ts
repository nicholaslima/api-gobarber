

import { Request,Response } from 'express';
import ListProvidersService from '@modules/appointments/services/listAppointmentsProviderService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class AppointmentProviderController{
    public async index(request: Request,response: Response){

       const { id } = request.user;
       const { day,year,month } = request.query;
       const listProvidersService =  container.resolve(ListProvidersService);
        
       const appointments = await listProvidersService.execute({ 
            provider_id: id,
            day: Number(day),
            year: Number(year),
            month: Number(month)
        });

        return response.json(classToClass(appointments));
    }

}

export default AppointmentProviderController;