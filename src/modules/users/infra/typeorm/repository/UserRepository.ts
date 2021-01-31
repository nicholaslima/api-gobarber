
import { EntityRepository,Repository } from 'typeorm';
import User from '../entities/User';


@EntityRepository(User)

class UserRepository extends Repository<User>{

    public async findByEmail(email: string): Promise<User | null>{
       const user = await this.findOne({ 
            where: { email },
        });
        console.log(email);

        return user || null;
    }
}

export default UserRepository;