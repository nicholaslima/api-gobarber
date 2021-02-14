import 'reflect-metadata';

import UploadAvatarService from './uploadAvatarService';
import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUserRepository';
import FakeDiskStorageProvider from '@shared/container/providers/StorageProvider/fake/fakeDiskStorageProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeDiskStorageProvider: FakeDiskStorageProvider;
let uploadAvatar: UploadAvatarService;

describe('upload avatar test',() => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeDiskStorageProvider = new FakeDiskStorageProvider();

        uploadAvatar = new UploadAvatarService(fakeUsersRepository,fakeDiskStorageProvider);
    })
    it('should be able to upload avatar',async () => {

        const user = await fakeUsersRepository.register({
            name: "nicholas",
            email: "nichollas36@email.com",
            password: "123456"
        });

       const response =  await uploadAvatar.execute({
            filename: 'imagem1.jpg',
            userID: user.id,
        });

        expect(response.avatar).toBe('imagem1.jpg');
    });

    it('should not be able to upload avatar in user that doesnt exist',async () => {
        await expect(
            uploadAvatar.execute({
                filename: 'imagem1.jpg',
                userID: 'id',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be delete old avatar in order to update to new avatar',async () => {

        
        const deleteFile = jest.spyOn(fakeDiskStorageProvider,'deleteFile');
        
        const user = await fakeUsersRepository.register({
            name: 'nicholas',
            email: 'nicholas@amil.com',
            password: '123456',
        });

        await uploadAvatar.execute({
            userID: user.id,
            filename: 'avatar.jpg',
        });

        await uploadAvatar.execute({
            filename: 'avatar1.jpg',
            userID: user.id,
        });
        //testa de o arquivo foi deletado e depois testa a existencia do avatar
        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar1.jpg');
    })
})