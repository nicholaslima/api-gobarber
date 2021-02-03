
import IAppointmentRepository from '../IAppointmentRepository';
import createAppointmentServiceDTO from '../../dtos/createAppointmentServiceDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';
import { isEqual } from 'date-fns';

import { v4 } from 'uuid';

class FakeAppointmentsRepository implements IAppointmentRepository{
    private appointments: Appointment[] = [];

    public async create({ provider_id,date}: createAppointmentServiceDTO): Promise<Appointment>{
        
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

}

export default FakeAppointmentsRepository;