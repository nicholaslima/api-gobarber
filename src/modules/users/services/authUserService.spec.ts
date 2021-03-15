
import 'reflect-metadata';
import AuthUserService from '@modules/users/services/authUserService';
import createUserService from '@modules/users/services/createUserService';
import FakeUserRepository from '@modules/users/repositories/fakes/fakeUserRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/fakeCacheProvider';
import FakeHashProvider from '@modules/users/providers/Hashprovider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authUser: AuthUserService;
let createUser: createUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('authenticate user',() => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeCacheProvider = new FakeCacheProvider();

        authUser = new AuthUserService(fakeUserRepository,fakeHashProvider);
        createUser =  new createUserService(
            fakeUserRepository,
            fakeHashProvider,
            fakeCacheProvider
        );
    })
    it('should be authenticate a user',async () => {
        
        const user = await fakeUserRepository.register({
            email: 'nichollas36@email.com',
            password: '123456',
            name: "nicholas"
        });


        const response = await authUser.execute({
            email: "nichollas36@email.com",
            password: "123456"
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate user that does not exist',async () => {
        await expect(
            authUser.execute({
                email: 'nichollas36@email.com',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate user that write wrong password',async () => {
        await createUser.execute({
            email: 'nichollas36@hotmail.com',
            password: '123',
            name: 'nicholas'
        });

        await expect(
            authUser.execute({
                email: 'nichollas36@hotmail.com',
                password: '12356',
            })
        ).rejects.toBeInstanceOf(AppError);
    });  
});