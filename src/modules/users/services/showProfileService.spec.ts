

import FakeUsersrepository from '@modules/users/repositories/fakes/fakeUserRepository';
import ShowProfileService from './showProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersrepository: FakeUsersrepository;
let showProfileService: ShowProfileService;

describe('show user profile',() => {
    beforeEach(() => {
        fakeUsersrepository = new FakeUsersrepository();
        showProfileService = new ShowProfileService(fakeUsersrepository);
    });

    it('should be able to show user profile',async () => {
        const user = await fakeUsersrepository.register({
            email: 'nicholas@email.com',
            name: 'nicholas lima',
            password: '123456',
        });

        const userProfile = await showProfileService.execute(user.id);

        expect(userProfile.id).toBe(user.id);
        expect(userProfile.name).toBe('nicholas lima');
        expect(userProfile.password).toBe('123456');
        expect(userProfile.email).toBe('nicholas@email.com');
    });

    it('should not be able to show profile that does not exist',async () => {
       await expect( 
           showProfileService.execute('sdfsd')
       ).rejects.toBeInstanceOf(AppError);
    })
})