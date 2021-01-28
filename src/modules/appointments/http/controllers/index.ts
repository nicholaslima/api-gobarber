
import { Request,Response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Repository from '../../infra/typeorm/repository';

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

    public async findAll(request: Request,response: Response){
        const repository = getCustomRepository(Repository);
        const appointments = await repository.find();
        console.log(appointments);
        return response.json(appointments);
    }

}