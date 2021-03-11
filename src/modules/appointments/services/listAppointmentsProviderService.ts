
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import { injectable,inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface Irequest{
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
class listAppointmentsProviderService{

    constructor(
        @inject('AppointmentRepository')
        private AppointmentRepository: IAppointmentRepository,
    ){}

    public async execute({ provider_id,day,month,year }:Irequest):Promise<Appointment[]>{
        const appointments = await this.AppointmentRepository.findByDayFromProvider({ 
            provider_id,
            day,
            month,
            year 
        });

        return appointments;
    }

}

export default listAppointmentsProviderService;