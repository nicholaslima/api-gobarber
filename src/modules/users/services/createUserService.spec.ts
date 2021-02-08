import 'reflect-metadata';
import fakeUserRepository from '@modules/users/repositories/fakes/fakeUserRepository';
import CreateUserService from '@modules/users/services/createUserService';
import FakeHashProvider from '@modules/users/providers/Hashprovider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

describe('CreateUser',() => {
    it('should be able to create a new user',async () => {

        const usersRepository = new fakeUserRepository();
        const hashProvider = new FakeHashProvider();
        const createUserService =  new CreateUserService(usersRepository,hashProvider);

        const user = await createUserService.execute({
            email: 'nicholas@mail.com',
            password: '123456',
            name: 'nicholas'
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a user with email already exist', async () => {
        const userRepository = new fakeUserRepository();
        const hashProvider = new FakeHashProvider();
        const createUSer = new CreateUserService(userRepository,hashProvider);

        await createUSer.execute({
            email: 'nicholas@email.com',
            password: '123456',
            name: 'nicholas',
        });

       await expect(
            createUSer.execute({
                email: 'nicholas@email.com',
                password: '123456',
                name: 'nicholas',
            })
        ).rejects.toBeInstanceOf(AppError);
    })
});