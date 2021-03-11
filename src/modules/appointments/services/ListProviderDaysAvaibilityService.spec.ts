import 'reflect-metadata';

import ListProviderDaysAvaibilityService from './ListProviderDaysAvaibilityService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/fakeAppointmentsRepository';
import FakeUserRepository from '@modules/users/repositories/fakes/fakeUserRepository';

let listProviderDaysAvaibilityService: ListProviderDaysAvaibilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeUserRepository: FakeUserRepository;

describe('ListProviderDaysAvaibilityService',() => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDaysAvaibilityService = new ListProviderDaysAvaibilityService(fakeAppointmentsRepository);
    });

    it('should be list appointments by day from provider',async ()=> {

        const user = await fakeUserRepository.register({
            email: 'nicholas@email.com',
            password: '123456',
            name: 'nicholas'
        });


        await fakeAppointmentsRepository.create({
            date: new Date(2014,5,5,13,0,0,0),
            provider_id: user.id,
            user_id: '123456'
        });

        await fakeAppointmentsRepository.create({
            date: new Date(2014,5,5,14,0,0,0),
            provider_id: user.id,
            user_id: '123456'
        });


        jest.spyOn(Date,'now').mockImplementationOnce(() => {
            return new Date(2014,4,5,10,0,0,0).getTime();
        });

        const availability = await listProviderDaysAvaibilityService.execute({ 
            provider_id: user.id,
            day: 5,
            year: 2014,
            month: 5,
         });

         expect(availability).toEqual(
             expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 11, available: true },
                { hour: 12, available: true },
                { hour: 13, available: false },
                { hour: 14, available: false },
                { hour: 15, available: true },
                { hour: 16, available: true },
                { hour: 17, available: true }
              ]
          )
         )
    })
})