

import IUserTokenRepositories from '../IUsersTokenRepositories';
import UserToken from '@modules/users/infra/typeorm/entities/TokenResetMail';
import { v4 } from 'uuid';

class FakeUserTokenRepositories implements IUserTokenRepositories{

        private users_token: UserToken[] = [];

        public async  generateToken(user_id: string): Promise<UserToken>{

            const userToken = new UserToken();
            const token = v4();
            const id = v4();
            
            Object.assign(userToken,{ 
                id,
                user_id,
                token,
                created_at: new Date(),
                updated_at: new Date(), 
            });

            this.users_token.push(userToken);

            return userToken
        }

        public async findUser(token: string): Promise<UserToken | undefined>{
            const user = this.users_token.find( user_token => user_token.token === token);

            return user || undefined;
        }



}


export default FakeUserTokenRepositories;