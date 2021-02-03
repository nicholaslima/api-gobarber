
import Appointment from '../infra/typeorm/entities/Appointment';
import CreateAppointmentServiceDTO from '../dtos/createAppointmentServiceDTO';

interface IAppointmentRepository{
    findByDate(date: Date): Promise<Appointment | null>
    create(data: CreateAppointmentServiceDTO): Promise<Appointment>
}

export default IAppointmentRepository;