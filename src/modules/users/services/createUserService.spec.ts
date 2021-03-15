import 'reflect-metadata';
import fakeUserRepository from '@modules/users/repositories/fakes/fakeUserRepository';
import CreateUserService from '@modules/users/services/createUserService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/fakeCacheProvider';
import FakeHashProvider from '@modules/users/providers/Hashprovider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let usersRepository: fakeUserRepository;
let hashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser',() => {
    beforeEach(() => {
        usersRepository = new fakeUserRepository();
        hashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();
        
        createUserService =  new CreateUserService(
            usersRepository,
            hashProvider,
            fakeCacheProvider
        );
    });
    
    it('should be able to create a new user',async () => {
        const user = await createUserService.execute({
            email: 'nicholas@mail.com',
            password: '123456',
            name: 'nicholas'
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a user with email already exist', async () => {

        await createUserService.execute({
            email: 'nicholas@email.com',
            password: '123456',
            name: 'nicholas',
        });

       await expect(
            createUserService.execute({
                email: 'nicholas@email.com',
                password: '123456',
                name: 'nicholas',
            })
        ).rejects.toBeInstanceOf(AppError);
    })
});