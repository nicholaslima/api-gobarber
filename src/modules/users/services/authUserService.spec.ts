
import 'reflect-metadata';
import AuthUserService from '@modules/users/services/authUserService';
import createUserService from '@modules/users/services/createUserService';
import FakeUserRepository from '@modules/users/repositories/fakes/fakeUserRepository';
import FakeHashProvider from '@modules/users/providers/Hashprovider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

describe('authenticate user',() => {
    it('should be authenticate a user',async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authUser = new AuthUserService(fakeUserRepository,fakeHashProvider);
        const createUser =  new createUserService(fakeUserRepository,fakeHashProvider);

        const user = await createUser.execute({
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

    it('should not be able to authenticate user that does not exist',() => {
        const fakesUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authUser = new AuthUserService(fakesUserRepository,fakeHashProvider);

        expect(
            authUser.execute({
                email: 'nichollas36@email.com',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate user that write wrong password',async () => {
        const fakesUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new createUserService(fakesUserRepository,fakeHashProvider);
        const authUser = new AuthUserService(fakesUserRepository,fakeHashProvider);

        await createUser.execute({
            email: 'nichollas36@hotmail.com',
            password: '123',
            name: 'nicholas'
        });

        expect(
            authUser.execute({
                email: 'nichollas36@hotmail.com',
                password: '12356',
            })
        ).rejects.toBeInstanceOf(AppError);
    });  
});