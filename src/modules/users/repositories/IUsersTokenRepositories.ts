
import userToken from '@modules/users/infra/typeorm/entities/TokenResetMail';

interface TokenResetMailProvider{
    generateToken(user_id: string): Promise<userToken>
}

export default TokenResetMailProvider;