


import createAppointmentServiceDTO from '../dtos/createAppointmentServiceDTO';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointment from '@modules/appointments/repositories/IAppointmentRepository';
import { inject, injectable } from 'tsyringe';
import { getHours,isBefore,startOfHour } from 'date-fns';

@injectable()
class CreateAppointmentService{

    constructor(
        @inject('AppointmentRepository')
        private appointmentRepository: IAppointment
    ){}


    public async execute({ date, provider_id,user_id }:createAppointmentServiceDTO): Promise<Appointment>{
        const appointmentExist = await this.appointmentRepository.findByDate(date);
        const appointmentDate = startOfHour(date);
    
        if(appointmentExist){
            throw new AppError('this appointment already booked');
        }

        if(provider_id === user_id){
            throw new AppError("you can't create appointment with yourself");
        }


        if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17){
            throw new AppError("you can't create appointment after 5pm and before 8am");
        }


        if(isBefore(appointmentDate,Date.now())){
            throw new AppError("you can't create a new appointment before current date");
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