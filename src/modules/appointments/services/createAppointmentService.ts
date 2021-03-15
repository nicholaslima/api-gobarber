


import createAppointmentServiceDTO from '../dtos/createAppointmentServiceDTO';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointment from '@modules/appointments/repositories/IAppointmentRepository';
import { inject, injectable } from 'tsyringe';
import { getHours,isBefore,startOfHour,format } from 'date-fns';
import INoticationRepository from '@modules/notifications/repositories/INoticationRepository';

@injectable()
class CreateAppointmentService{

    constructor(
        @inject('AppointmentRepository')
        private appointmentRepository: IAppointment,

        @inject('NotificationRepository')
        private notificationRepository: INoticationRepository,

        @inject('CacheProvider')
        private CacheProvider: ICacheProvider,
    ){}


    public async execute({ date, provider_id,user_id }:createAppointmentServiceDTO): Promise<Appointment>{
        const appointmentExist = await this.appointmentRepository.findByDate(date,provider_id);
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


        const dateFormated = format(appointmentDate,"dd/MM/yyyy 'ás' HH:mm'h'");

        await this.notificationRepository.create({
            content: `um appointment foi marcado no dia ${ dateFormated }`,
            recipient_id: provider_id,
        });

        await this.CacheProvider.invalidate(`list_appointments_provider-${ provider_id }:${ format(
            appointmentDate,
            "yyyy-M-d") 
        }`);

        console.log('cache apagado');

        return appointment;
    }

}

export default CreateAppointmentService;