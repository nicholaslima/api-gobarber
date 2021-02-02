
import { getRepository,Repository } from 'typeorm';
import User from '../entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepositories';
import createUserDto from '@modules/users/dto/createUSerDTO';

class UserRepository implements IUsersRepository{

    private ormRepository: Repository<User>

    constructor(){
        this.ormRepository = getRepository(User);
    }

    public async register({name,password,email}: createUserDto): Promise<User>{
        const user = this.ormRepository.create({name,email,password});

        this.ormRepository.save(user);

        return user;
    }

    public async update(user: User): Promise<User>{

        this.ormRepository.save(user);
        return user;
    }

    public async findByEmail(email: string): Promise<User | null>{
       const user = await this.ormRepository.findOne({ 
            where: { email },
        });
        console.log(email);

        return user || null;
    }

    public async findById(id: string): Promise<User | null>{
        const user = await this.ormRepository.findOne({ 
            where: { id }
        });

        return user || null;
    }
}

export default UserRepository;