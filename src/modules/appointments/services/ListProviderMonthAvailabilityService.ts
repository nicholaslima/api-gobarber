
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import typeListProviderMonth from '@modules/appointments/dtos/ListProviderMonthAvailabilityServiceDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import{ injectable,inject } from 'tsyringe';


interface responseType {
    valid: boolean
}

@injectable()
class ListProviderMonthAvailabilityService{

    constructor(
        @inject('AppointmentRepository')
        private AppointmentRepository: IAppointmentRepository,
    ){}

    public async execute({ provider_id,month,year }:typeListProviderMonth):Promise<Appointment[]>{
        const providers = await this.AppointmentRepository.findByMonthFromProvider({ provider_id,month,year });

        return providers;
    }

}


export default ListProviderMonthAvailabilityService
