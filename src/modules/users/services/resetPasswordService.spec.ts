
import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUserRepository';
import ResetPasswordService from './resetPasswordService';
import FakeHashProvider from "@modules/users/providers/Hashprovider/fakes/FakeHashProvider";
import FakeUsersTokenRepository from '@modules/users/repositories/fakes/fakeUserTokenRepository';
import AppError from '@shared/errors/AppError';

let usersRepository: FakeUsersRepository;
let resetPassword: ResetPasswordService;
let usersTokenRepository: FakeUsersTokenRepository;
let hashProvider: FakeHashProvider;

describe('reset password service', () => {
    beforeEach(() => {
        usersRepository = new FakeUsersRepository();
        usersTokenRepository = new FakeUsersTokenRepository();
        hashProvider = new FakeHashProvider();

        resetPassword = new ResetPasswordService(
            usersTokenRepository,
            usersRepository,
            hashProvider
        );
        
    });

    it('should be able to reset password with token user',async () => {

       const generateHash =  jest.spyOn(hashProvider,'generateHash');

        const user = await usersRepository.register({
            name: 'nicholas',
            email: 'nicholas@email.com',
            password: '123456',
        });

        const { token } = await usersTokenRepository.generateToken(user.id);

       await resetPassword.execute({
            token,
            password: 'nova senha',
        });

        const userFound = await usersRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('nova senha');
        expect(userFound?.password).toBe('nova senha');

    });

    it('should not be able to reset password if user dont have valid token',async () => {
        await expect(
            resetPassword.execute({
                token: 'invalid token',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password from user does not exist', async () => {
        const { token } = await usersTokenRepository.generateToken('1245');
        await expect( 
            resetPassword.execute({
                token,
                password: '1245'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password with token expired in 2 hous', async () => {
       const user = await usersRepository.register({
            name: 'nicholas',
            email: 'nich@email.com',
            password: '123456',
        });

        const { token } = await usersTokenRepository.generateToken(user.id);

        jest.spyOn(Date,'now').mockImplementationOnce(() => {
            const hourNow =  new Date();
            const more3 = hourNow.getHours() + 3;
            return hourNow.setHours(more3);
        })

        await expect( 
            resetPassword.execute({
                token,
                password: '1245'
            })
        ).rejects.toBeInstanceOf(AppError);
    })
});