
import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserDTO from '@modules/users/dto/createUSerDTO';
import IusersRepository from '@modules/users/repositories/IUsersRepositories';
import { v4 } from 'uuid';



class FakeUserRepository implements IusersRepository{
    private users: User[] = [];
   

    public async register({ name,email,password } : CreateUserDTO): Promise<User>{

        const user = new User();
        const id = v4();

        Object.assign(user,{ id, name,email,password });
        this.users.push(user);

        return user;
    }

    public async findByEmail(email: string): Promise<User | null>{

        const user = this.users.find(user => user.email === email);

        return user || null;
    }

    public async update(user: User): Promise<User>{
        this.users.push(user);

        return user;
    }

    public async findById(id: string): Promise<User | null>{
        const user = this.users.find( user => user.id === id );
        return user || null;
    }
}

export default FakeUserRepository;