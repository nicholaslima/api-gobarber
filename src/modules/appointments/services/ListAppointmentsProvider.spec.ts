

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/fakeAppointmentsRepository';
import ListAppointmentsProvider from './listAppointmentsProviderService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/fakeCacheProvider';

let listAppointmentsProvider: ListAppointmentsProvider;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider:FakeCacheProvider;

describe('appointments from provider',() => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listAppointmentsProvider = new ListAppointmentsProvider(
            fakeAppointmentsRepository,
            fakeCacheProvider
        );
    });

    it('should be able to list appoontments from provider by day',async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            date: new Date(2020,2,25,0,0),
            user_id: 'user',
            provider_id: 'provider'
        });

        const appointment2 =  await fakeAppointmentsRepository.create({
            date: new Date(2020,2,25,0,0),
            user_id: 'user',
            provider_id: 'provider'
        });

        const appointments = await listAppointmentsProvider.execute({
            provider_id: 'provider',
            day: 25,
            month: 2,
            year: 2020,
        });
        
        expect(appointments).toEqual([
            appointment1,
            appointment2
        ]);

    })
})