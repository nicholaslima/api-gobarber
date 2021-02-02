
import { Request,Response } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repository/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/service/createAppointmentService';
import { container } from 'tsyringe';

export default class AppointmentControler{

    public async create(request: Request,response: Response){
        const { date,provider_id } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = container.resolve(CreateAppointmentService);
        
        const Appointment = await createAppointment.execute({
           date: parsedDate,
           provider_id
        });

        return response.json(Appointment);
    }

    public async findAll(request: Request,response: Response){
        const repository = new AppointmentRepository();
        const appointments = await repository.AllRepositories();

        return response.json(appointments);
    }

}