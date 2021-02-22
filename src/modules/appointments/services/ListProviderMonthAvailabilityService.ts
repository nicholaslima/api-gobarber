
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import typeListProviderMonth from '@modules/appointments/dtos/ListProviderMonthAvailabilityServiceDTO';


import { injectable,inject } from 'tsyringe';
import { getDaysInMonth,getDate  } from 'date-fns';

type responseType  = Array<{
    day: number;
    available: boolean,
}>;

@injectable()
class ListProviderMonthAvailabilityService{

    constructor(
        @inject('AppointmentRepository')
        private AppointmentRepository: IAppointmentRepository,
    ){}

    public async execute({ provider_id,month,year }:typeListProviderMonth):Promise<responseType>{
        
        const appointments = await this.AppointmentRepository.findByMonthFromProvider({ 
            provider_id,
            month,year 
        });

        const date = new Date(year,month);
        let days = getDaysInMonth(date);

        const daysArray = Array.from(
            { 
                length: days
            },
            (_,index) => index + 1,
        );

       const availability = daysArray.map( day => {
            const apointmentsDay = appointments.filter( appointment => {
                const dayAppointment = getDate( appointment.date );
                return dayAppointment === day;
            });
           
            return { 
                day, 
                available: apointmentsDay.length < 10,
            };
        });

        return availability;
    }   
}


export default ListProviderMonthAvailabilityService
