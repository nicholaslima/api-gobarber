
import 'reflect-metadata';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/fakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/createAppointmentService';
import NotificationRepository from '@modules/notifications/repositories/fakes/fakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/fakeCacheProvider';

import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;
let notificationRepository: NotificationRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('create Appointment',() => {
    beforeEach(( ) => {
        notificationRepository = new NotificationRepository();
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        
        createAppointmentService = new CreateAppointmentService(
            fakeAppointmentsRepository,
            notificationRepository,
            fakeCacheProvider
        );
    });
    
    it('should be able to create new appointment',async () => {

        jest.spyOn(Date,'now').mockImplementationOnce(() => {
            return new Date(2021,5,5,10).getTime();
        });

       const appointment = await createAppointmentService.execute({
           date: new Date(2021,5,6,11),
           provider_id: 'provider_id',
           user_id: 'user_id',
        });
       
       expect(appointment).toHaveProperty('id');
       expect(appointment.provider_id).toBe('provider_id');
    });

    it('should not create two appointments in the same time', async () => {


        await createAppointmentService.execute({
            date: new Date(2021,5,5,9),
            provider_id: 'provider_id', 
            user_id: 'user_id',
        });

        expect(
            createAppointmentService.execute({
                    date: new Date(2021,5,5,9),
                    provider_id:'provider_id',
                    user_id: 'user_id',
                })
        ).rejects.toBeInstanceOf(AppError);
    });


    it('should not be able  to create appointment with yourself',async () => {
        jest.spyOn(Date,'now').mockImplementationOnce(() => {
            return new Date(2021,5,5,10).getTime();
        });

         await expect(
             createAppointmentService.execute({
                date: new Date(2021,5,5,11),
                provider_id: 'sameid',
                user_id: 'sameid',
            })
         ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create appointment after 5pm and before 8am',async() => {
        jest.spyOn(Date,'now').mockImplementationOnce(() => {
            return new Date(2021,5,4,7).getTime();
        });
        
        await expect(
            createAppointmentService.execute({
                date: new Date(2021,5,5,7),
                provider_id: 'provider_id',
                user_id: 'user_id',
            })
        ).rejects.toBeInstanceOf(AppError);
        
        await expect(
            createAppointmentService.execute({
                date: new Date(2021,5,5,18),
                provider_id: 'provider_id',
                user_id: 'user_id',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create new appointment before current date',async() => {
        
        jest.spyOn(Date,'now').mockImplementationOnce(() => {
            return new Date(2014,5,5,10).getTime();
        });
        
        await expect(
            createAppointmentService.execute({
                date: new Date(2014,5,5,8),
                provider_id: 'provider_id',
                user_id: 'user_id',
            })
        ).rejects.toBeInstanceOf(AppError);
    })

})