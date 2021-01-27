
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../infra/typeorm/repository';
import createAppointmentServiceDTO from '../dtos/createAppointmentServiceDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

class CreateAppointmentService{
    public async execute({ date, provider }:createAppointmentServiceDTO): Promise<Appointment>{
        
        const repository = getCustomRepository(AppointmentRepository);

       const appointmentExist = await repository.findByDate(date);

        if(appointmentExist){
            throw new Error('this appointment already booked');
        }

        const appointment = await repository.create({
            date,
            provider
        });

        const response = await repository.save(appointment);

        return response;
    }

}

export default CreateAppointmentService;