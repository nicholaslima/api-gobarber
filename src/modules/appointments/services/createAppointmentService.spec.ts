
import 'reflect-metadata';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/fakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/createAppointmentService';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';

describe('create Appointment',() => {
    it('should be able to create new appointment',async() => {
       const appointmentRepository = new FakeAppointmentsRepository();
       const service = new CreateAppointmentService(appointmentRepository);

       const date = new Date();
       const provider_id = '123456';

       const appointment = await service.execute({date,provider_id});
       
       expect(appointment).toHaveProperty('id');
       expect(appointment.provider_id).toBe('123456');
    });

    it('should not create two appointments in the same time', async () => {

        const AppoitnemtRepository = new FakeAppointmentsRepository();
        const createAppoitment = new CreateAppointmentService(AppoitnemtRepository);

        const date = new Date();
        const provider_id = '123456';

        await createAppoitment.execute({date,provider_id});

        expect(
            createAppoitment.execute({
                    date,
                    provider_id
                })
        ).rejects.toBeInstanceOf(AppError);
    })
})