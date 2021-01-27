import { Repository,EntityRepository } from 'typeorm';
import Appointment from '../entities/Appointment';

@EntityRepository(Appointment)

class AppointmentsRepository extends Repository<Appointment>{
    public async findByDate(date: Date): Promise<Appointment | null>{
        const appointment = await this.findOne({
            where: { date },
        })

        return appointment || null;
    }
}


export default AppointmentsRepository;