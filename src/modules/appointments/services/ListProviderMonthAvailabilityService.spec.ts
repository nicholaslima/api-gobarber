
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

        const user2 = await fakeUserRepository.register({
            email: 'jose@email.com',
            name: 'jose',
            password: '123456'
        })

        const appointment1 = await fakeAppointmentsRepository.create({
            date: new Date(2014,5,5,5,0,0,0),
            provider_id: user.id,
        });

        const appointment2 = await fakeAppointmentsRepository.create({
            date: new Date(2014,5,5,12,0,0,0),
            provider_id: user.id,
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2014,5,5,8,0,0,0),
            provider_id: user2.id,
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2012,5,5,8,0,0,0),
            provider_id: user.id,
        });

        const appointments = await listProviderMonthAvailabilityService.execute({
            month: 6,
            year: 2014,
            provider_id: user.id,
        });

        expect(appointments).toEqual([appointment1,appointment2]);

    });  
})