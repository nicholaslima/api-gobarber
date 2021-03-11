import { Repository,getRepository,Raw } from 'typeorm';
import Appointment from '../entities/Appointment';
import  createAppointmentDTO from '@modules/appointments/dtos/createAppointmentServiceDTO';
import ListProviderMonthAvailabilityServiceDTO from '@modules/appointments/dtos/ListProviderMonthAvailabilityServiceDTO';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ListProviderDaysAvaibilityServiceDTO from 'modules/appointments/dtos/ListProviderDaysAvaibilityServiceDTO';

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
 

    public async create({ provider_id ,date,user_id }: createAppointmentDTO):Promise<Appointment>{
        const appointment = await this.ormRepository.create({
            provider_id, date, user_id 
        });

        await this.ormRepository.save(appointment); 

        return appointment;
    }

    public async AllRepositories(): Promise<Appointment[]>{
        const appointments = await this.ormRepository.find();

        return appointments
    };

    public async findByMonthFromProvider({ provider_id,month,year }: ListProviderMonthAvailabilityServiceDTO): Promise<Appointment[]>{

        const parseMonth = String(month).padStart(2,'0');
        const appointments = await this.ormRepository.find({
            where:{
                provider_id, 
                date: Raw(
                    dateFieldname => `to_char(${dateFieldname},'MM-YYYY') ='${parseMonth}-${year}'`,
                ),
            }
        });

        console.log(appointments);
        return appointments;
    }

    public async findByDayFromProvider({ month, day, provider_id, year }: ListProviderDaysAvaibilityServiceDTO): Promise<Appointment[]>{
       
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');


        const appointments = await this.ormRepository.find({
            where: {
              provider_id,
              date: Raw(
                dateFieldName =>
                  `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
              ),
            },
            relations: ['user'],
          });

        return appointments;
    }
}


export default AppointmentsRepository;
