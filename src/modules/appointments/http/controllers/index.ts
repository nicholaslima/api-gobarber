
import { Request,Response } from 'express';
import { parseISO } from 'date-fns';
import CreateService from '@modules/appointments/service/createAppointmentService';

export default class AppointmentControler{

    public async create(request: Request,response: Response){
        const { date,provider } = request.body;

        const parsedDate = parseISO(date);

        const service = new CreateService();

        const Appointment = await service.execute({
           date: parsedDate,
           provider
        });

        return response.json(Appointment);
    }

}