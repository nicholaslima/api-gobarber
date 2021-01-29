
import { getRepository } from 'typeorm';

import createUSerDTO from '@modules/users/dto/createUSerDTO';
import User from '../infra/typeorm/entities/User';

class CreateUSerService{
    public async execute({ name,password,email }: createUSerDTO): Promise<User>{
     
       const Repository =  getRepository(User);

       const userExist = await Repository.findOne({ where: { email }});

       if(userExist){
            throw new Error('this email already exist');
       }
      
       const user = await Repository.create({
            name,password,email 
       });
       
      const response =  await Repository.save(user);

       return response;
    }
}

export default CreateUSerService;