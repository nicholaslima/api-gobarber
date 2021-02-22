

import ListProviderDaysAvaibilityServiceDTO from '@modules/appointments/dtos/ListProviderDaysAvaibilityServiceDTO';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import { inject,injectable } from 'tsyringe';
import { getHours,getDate,isAfter  } from 'date-fns';

type responseType = Array<{
    available: boolean;
    hour: number;
}>;

@injectable()
class ListProviderDaysAvaibilityService{

    constructor(
        @inject('AppointmentRepository')
        private AppointmentRepository: IAppointmentRepository,
    ){}


    public async execute({ day,year,month,user_id }: ListProviderDaysAvaibilityServiceDTO): Promise<responseType>{
        
        const appointments = await this.AppointmentRepository.findByDayFromProvider({ day,year,month,user_id });
        const hourStart = 8;

        const hoursAppointment = Array.from({ 
            length: 10
        },(_,index) => index + hourStart);

        const currentDate = new Date(Date.now());

        const availability = hoursAppointment.map( hour => {
            const hasAppointment = appointments.find( appointment => { 
                    return getHours(appointment.date) === hour;
                }
            );

            const compareDate = new Date(year,month - 1,day,hour);
                
            return { 
                hour,
                available: !hasAppointment && isAfter(compareDate,currentDate),
            }
        });
        ;

        return availability;
    }

}


export default ListProviderDaysAvaibilityService;