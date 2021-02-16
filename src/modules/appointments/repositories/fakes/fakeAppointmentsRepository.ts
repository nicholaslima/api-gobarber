
import IAppointmentRepository from '../IAppointmentRepository';
import ListProviderMonthAvailabilityServiceDTO from '@modules/appointments/dtos/ListProviderMonthAvailabilityServiceDTO';
import createAppointmentServiceDTO from '../../dtos/createAppointmentServiceDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';
import { isEqual } from 'date-fns';

import { v4 } from 'uuid';

class FakeAppointmentsRepository implements IAppointmentRepository{
    private appointments: Appointment[] = [];

    public async create({ provider_id,date }: createAppointmentServiceDTO): Promise<Appointment>{
        
        const appointment = new Appointment();
        const id  = v4();

        Object.assign(appointment, { id,provider_id,date });
        this.appointments.push(appointment);

        return appointment;
    }


    public async findByDate(date: Date): Promise<Appointment | null>{
       const appointment =  this.appointments.find((appointment) =>  
            isEqual(appointment.date,date)
        );

        return appointment || null;
    }

    public async findByMonthFromProvider({ month,provider_id,year }:ListProviderMonthAvailabilityServiceDTO): Promise<Appointment[]>{
        const appointments = this.appointments.filter( appointment => 
            appointment.provider_id === provider_id
        );

       const appointmentsTimes = appointments.filter( appointment => {
            const dateString = appointment.date;
            const dateAppointment = new Date(dateString);

            const monthAppointment = dateAppointment.getMonth() + 1;
            const yearAppointment = dateAppointment.getFullYear();

            if(monthAppointment === month && yearAppointment === year){
                return appointment;
            }
        });

        return appointmentsTimes;
    }

}

export default FakeAppointmentsRepository;