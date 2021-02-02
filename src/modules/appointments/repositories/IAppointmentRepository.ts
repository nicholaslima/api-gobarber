
import Appointment from '../infra/typeorm/entities/Appointment';
import CreateAppointmentSErviceDTO from '../dtos/createAppointmentServiceDTO';

interface IAppointmentRepository{
    findByDate(date: Date): Promise<Appointment | null>
    create(data: CreateAppointmentSErviceDTO): Promise<Appointment>
}

export default IAppointmentRepository;