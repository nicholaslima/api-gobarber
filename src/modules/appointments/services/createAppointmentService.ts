


import createAppointmentServiceDTO from '../dtos/createAppointmentServiceDTO';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointment from '@modules/appointments/repositories/IAppointmentRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateAppointmentService{

    constructor(
        @inject('AppointmentRepository')
        private appointmentRepository: IAppointment
    ){}


    public async execute({ date, provider_id,user_id }:createAppointmentServiceDTO): Promise<Appointment>{
        const appointmentExist = await this.appointmentRepository.findByDate(date);

        if(appointmentExist){
            throw new AppError('this appointment already booked');
        }

        const appointment = await this.appointmentRepository.create({
            provider_id,
            date,
            user_id 
        });
        return appointment;
    }

}

export default CreateAppointmentService;