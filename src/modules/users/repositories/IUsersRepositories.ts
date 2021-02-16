
import User from '@modules/users/infra/typeorm/entities/User';
import createUserDto from '@modules/users/dto/createUSerDTO';
import IfindAllProvidersDTO from '@modules/users/dto/IfindAllProvidersDTO';


interface IUsersRepositories{
  findByEmail(email: string): Promise<User | null>;
  register(data: createUserDto): Promise<User>;  
  findById(id: string):Promise<User | null>;
  update(user: User): Promise<User>;
  findAllProviders(data: IfindAllProvidersDTO): Promise<User[]>;
}

export default IUsersRepositories;