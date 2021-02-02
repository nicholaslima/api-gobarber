
import User from '@modules/users/infra/typeorm/entities/User';
import createUserDto from '@modules/users/dto/createUSerDTO';

interface IUsersRepositories{
  findByEmail(email: string): Promise<User | null>;
  register(data: createUserDto): Promise<User>;  
  findById(id: string):Promise<User | null>;
  update(user: User): Promise<User>;
}

export default IUsersRepositories;