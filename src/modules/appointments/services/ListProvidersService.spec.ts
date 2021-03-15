import 'reflect-metadata';
import ListProvidersService from './listProvidersService';
import FakeUserRepository from '@modules/users/repositories/fakes/fakeUserRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/fakeCacheProvider';

let listProvidersService: ListProvidersService;
let fakeUserRepository: FakeUserRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('list  Providers',() => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeCacheProvider = new FakeCacheProvider();
        
        listProvidersService = new ListProvidersService(
            fakeUserRepository,
            fakeCacheProvider
        );
    });
    it('should be list providers',async() => {

       const user1 = await fakeUserRepository.register({
            email: 'nicholas@email.com',
            name: 'nicholas lima',
            password: '123456'
        });

        const user2 = await fakeUserRepository.register({
            email: 'jose@email.com',
            name: 'josé',
            password: '111'
        });

       const user =  await fakeUserRepository.register({
            email: 'joao@email.com',
            name: 'joao',
            password: '222'
        });

        const users = await listProvidersService.execute({
            except_user_id: user.id
        });

        expect(users).toEqual([
            user1,user2
        ])
    })
})