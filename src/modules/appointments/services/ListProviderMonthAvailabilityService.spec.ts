
import 'reflect-metadata';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/fakeAppointmentsRepository';
import FakeUserRepository from '@modules/users/repositories/fakes/fakeUserRepository';

let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeUserRepository: FakeUserRepository;

describe('ListProviderMonthAvailabilityService',() => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);
    });
    it('should be list appointments month from provider',async() => {

        const user = await fakeUserRepository.register({
            email: 'nicholas@email.com',
            name: 'nicholas',
            password: '123456'
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2014,5,5,1,0,0,0),
            provider_id: user.id,
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2014,5,5,2,0,0,0),
            provider_id: user.id,
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2014,5,5,3,0,0,0),
            provider_id: user.id,
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2014,5,5,4,0,0,0),
            provider_id: user.id,
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2014,5,5,5,0,0,0),
            provider_id: user.id,
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2014,5,5,6,0,0,0),
            provider_id: user.id,
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2014,5,5,7,0,0,0),
            provider_id: user.id,
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2014,5,5,8,0,0,0),
            provider_id: user.id,
        });

         await fakeAppointmentsRepository.create({
            date: new Date(2014,5,5,9,0,0,0),
            provider_id: user.id,
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2014,5,5,10,0,0,0),
            provider_id: user.id,
        });

        const availability = await listProviderMonthAvailabilityService.execute({
            month: 6,
            year: 2014,
            provider_id: user.id,
        });


        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 4, available: true },
                { day: 5, available: false },
                { day: 7, available: true },
                { day: 8, available: true },
            ])
        )

    });  
})