
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import { injectable,inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

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

        @inject('CacheProvider')
        private CacheProvider: ICacheProvider,
    ){}

    public async execute({ provider_id,day,month,year }:Irequest):Promise<Appointment[]>{

        const cacheKey = `list_appointments_provider-${ provider_id }:${ year }-${ month }-${ day }`;

        let appointments = await this.CacheProvider.recover<Appointment[]>(cacheKey);

        if(!appointments){
            appointments = await this.AppointmentRepository.findByDayFromProvider({ 
                provider_id,
                day,
                month,
                year 
            });

            await this.CacheProvider.save(cacheKey,classToClass(appointments));
        }

        return appointments;
    }

}

export default listAppointmentsProviderService;