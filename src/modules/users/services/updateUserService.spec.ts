
import FakeUsersRepository from '../repositories/fakes/fakeUserRepository';
import UpdateUserService from './updateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/Hashprovider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let updateUserService: UpdateUserService;
let fakeHashProvider: FakeHashProvider;

describe('update user',() => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        updateUserService = new UpdateUserService(fakeUsersRepository,fakeHashProvider);
    });

    it('should be update user',async () => {

        const user =  await fakeUsersRepository.register({
            email: 'nichollas@email.com',
            password: '12456',
            name: 'nicholas'
        });

        const userUpdated = await updateUserService.execute({
            name: 'nicholas lima',
            email: 'nichollas36@email.com',
            password: '123456',
            old_password: '12456',
            user_id: user.id,
        });

        expect(userUpdated.password).toBe('123456');
        expect(userUpdated.email).toBe('nichollas36@email.com');
        expect(userUpdated.name).toBe('nicholas lima');
    });

    it('should not update user that does not exist',async() => {
        await expect(
            updateUserService.execute({
                name: 'nicholas',
                email: 'nichollas@email.com',
                password: '123456',
                old_password: '1245',
                user_id: '123456',
            })
        ).rejects.toBeInstanceOf(AppError)
        
    });

    it('should not be able to update user with email already exist',async() => {
        await fakeUsersRepository.register({
            email: 'nichollas@email.com',
            password: '12456',
            name: 'nicholas'
        });

        const user = await fakeUsersRepository.register({
            email: 'jp@email.com',
            password: '12456',
            name: 'nicholas'
        });


       await expect(
            updateUserService.execute({
                name: 'nicholas',
                email: 'nichollas@email.com',
                password: '123456',
                old_password: '1245',
                user_id: user.id,
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    
    it('should be able to update password',async() => {
        const user = await fakeUsersRepository.register({
            name: 'nicholas',
            password: '123456',
            email: 'nicholas@email.com',
        });

        const userUpdated = await updateUserService.execute({
            name: 'nicholas',
            password: 'new-password',
            email: 'nicholas@email.com',
            old_password:'123456',
            user_id: user.id,
        });

        expect(userUpdated.password).toBe('new-password');
    });


    it('should not be able to update password without old password',async() => {
        const user = await fakeUsersRepository.register({
            name: 'nicholas',
            email: 'nicholas@email.com',
            password: '123456',
        });


        await expect(
            updateUserService.execute({
                user_id: user.id,
                name: 'nicholas',
                password: 'new-password',
                email: 'nicholas@email.com'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update user with wrong old password',async () => {

        const user = await fakeUsersRepository.register({ 
            email: 'nicholas@email.com',
            password: '123456',
            name: 'nicholas',
        });

        await expect(
            updateUserService.execute({ 
                email: 'nicholas@email.com',
                name: 'nicholas lima',
                user_id:  user.id,
                old_password: 'wrong-password',
                password:'new-password',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update password without new password',async () => {

        const user = await fakeUsersRepository.register({ 
            email: 'nicholas@email.com',
            password: '123456',
            name: 'nicholas',
        });

        await expect(
            updateUserService.execute({ 
                email: 'nicholas@email.com',
                name: 'nicholas lima',
                user_id:  user.id,
                old_password: '123456',
            })
        ).rejects.toBeInstanceOf(AppError);
    });
})