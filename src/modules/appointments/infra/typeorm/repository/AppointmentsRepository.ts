import { Repository,getRepository } from 'typeorm';
import Appointment from '../entities/Appointment';
import  createAppointmentDTO from '@modules/appointments/dtos/createAppointmentServiceDTO';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

class AppointmentsRepository implements IAppointmentRepository {

    private ormRepository: Repository<Appointment>;

    constructor(){
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | null>{
        const appointment = await this.ormRepository.findOne({
            where: { date },
        })

        return appointment || null;
    }

    public async create({ provider_id ,date }: createAppointmentDTO):Promise<Appointment>{
        const appointment = await this.ormRepository.create({
            provider_id, date
        });

        await this.ormRepository.save(appointment); 

        return appointment;
    }

    public async AllRepositories(): Promise<Appointment[]>{
        const appointments = await this.ormRepository.find();

        return appointments
    };
}


export default AppointmentsRepository;
