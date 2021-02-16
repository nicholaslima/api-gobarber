
import Appointment from '../infra/typeorm/entities/Appointment';
import CreateAppointmentServiceDTO from '../dtos/createAppointmentServiceDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import ListProvidersServiceDTO from '@modules/appointments/dtos/listProvidersServiceDTO';
import ListProviderMonthAvailabilityServiceDTO from '@modules/appointments/dtos/ListProviderMonthAvailabilityServiceDTO';

interface IAppointmentRepository{
    findByDate(date: Date): Promise<Appointment | null>;
    create(data: CreateAppointmentServiceDTO): Promise<Appointment>;
    findByMonthFromProvider(data :ListProviderMonthAvailabilityServiceDTO): Promise<Appointment[]>
}

export default IAppointmentRepository;