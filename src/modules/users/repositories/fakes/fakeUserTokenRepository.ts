

import IUserTokenRepositories from '../IUsersTokenRepositories';
import UserToken from '@modules/users/infra/typeorm/entities/TokenResetMail';
import { v4 } from 'uuid';


class FakeUserTokenRepositories implements IUserTokenRepositories{

        private user_token: UserToken[] = [];

        public async  generateToken(user_id: string): Promise<UserToken>{

            const userToken = new UserToken();
            const token = v4();
            const id = v4();
            
            Object.assign(userToken,{ 
                id,
                user_id,
                token 
            });

            this.user_token.push(userToken);

            return userToken
        }

}


export default FakeUserTokenRepositories;