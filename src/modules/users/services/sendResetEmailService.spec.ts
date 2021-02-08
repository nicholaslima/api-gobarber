import 'reflect-metadata';

import SendResetEmailService from './sendResetEmailService';
import FakeSendResetEmailProvider from '@shared/container/providers/sendResetEmail/fakes/fakeSendResetEmailProvider';
import FakeUsersTokenRepository from '@modules/users/repositories/fakes/fakeUserTokenRepository';
import FakeUsersRepositories from '@modules/users/repositories/fakes/fakeUserRepository';
import AppError from '@shared/errors/AppError';

let fakeSendResetEmailProvider: FakeSendResetEmailProvider;
let fakeUsersRepository: FakeUsersRepositories;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let sendResetEmail: SendResetEmailService;

describe('send email for reset',() => {
    beforeEach(() => {
        fakeSendResetEmailProvider = new FakeSendResetEmailProvider();
        fakeUsersRepository = new FakeUsersRepositories();
        fakeUsersTokenRepository = new FakeUsersTokenRepository();
        
        sendResetEmail = new SendResetEmailService(
            fakeUsersRepository,
            fakeSendResetEmailProvider,
            fakeUsersTokenRepository
        );
    });

    it('should be send an email for reset password',async () => {

        const user = await fakeUsersRepository.register({
            name: 'nicholas',
            email: 'nicholas@email.com',
            password: '123456',
        });

       const sendEmail = jest.spyOn(fakeSendResetEmailProvider,'sendEmail');

       await sendResetEmail.execute({ email: user.email });

       expect(sendEmail).toHaveBeenCalled();
    });

    it('should not be able to recover a non-exist user password',async () => {

        await expect(
            sendResetEmail.execute({ email: 'nicholas@email.com' })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to generate token for reset password',async () => {

        const generateToken = jest.spyOn(fakeUsersTokenRepository,'generateToken');

        const user = await fakeUsersRepository.register({
            name: 'nicholas',
            email: 'nicholas@email.com',
            password: '123456',
        });

        await sendResetEmail.execute({
            email: user.email
        });

        expect(generateToken).toBeCalledWith(user.id);
    });
})