
import { Repository,getRepository } from 'typeorm';
import IuserTokenRepository from '@modules/users/repositories/IUsersTokenRepositories';
import userToken from '@modules/users/infra/typeorm/entities/TokenResetMail';



class userTokenRepository implements IuserTokenRepository{

    private ormRepository: Repository<userToken>;

    constructor(){
        this.ormRepository = getRepository(userToken); 
    }

    public async generateToken(user_id: string): Promise<userToken>{

        const userToken = this.ormRepository.create({
            user_id
        });

        await this.ormRepository.save(userToken);

        return userToken;
    }


    public async findUser(token :string): Promise<userToken | undefined>{
        const userToken = this.ormRepository.findOne({
            where:{ 
                token 
            }
        });

        return userToken || undefined;
    }
}

export default userTokenRepository;
