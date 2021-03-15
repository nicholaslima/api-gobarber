
import Appointment from '../infra/typeorm/entities/Appointment';
import CreateAppointmentServiceDTO from '../dtos/createAppointmentServiceDTO';
import ListProviderDaysAvaibilityServiceDTO from '@modules/appointments/dtos/ListProviderDaysAvaibilityServiceDTO';
import ListProviderMonthAvailabilityServiceDTO from '@modules/appointments/dtos/ListProviderMonthAvailabilityServiceDTO';

interface IAppointmentRepository{
    findByDate(date: Date,provider_id: string): Promise<Appointment | null>;
    create(data: CreateAppointmentServiceDTO): Promise<Appointment>;
    findByMonthFromProvider(data :ListProviderMonthAvailabilityServiceDTO): Promise<Appointment[]>
    findByDayFromProvider(data: ListProviderDaysAvaibilityServiceDTO): Promise<Appointment[]>
}

export default IAppointmentRepository;