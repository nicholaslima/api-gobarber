
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import createUSerDTO from '@modules/users/dto/createUSerDTO';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

class CreateUSerService{
    public async execute({ name,password,email }: createUSerDTO): Promise<User>{
     
       const Repository =  getRepository(User);

       const userExist = await Repository.findOne({ where: { email }});

       if(userExist){
            throw new AppError('this email already exist');
       }

       const passwordHashed = await hash(password,8);
      
       const user = await Repository.create({
            name,
            password: passwordHashed,
            email 
       });
       
      const response =  await Repository.save(user);

       return response;
    }
}

export default CreateUSerService;