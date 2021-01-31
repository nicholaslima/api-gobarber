
import AuthUSerDTO from '../dto/authUserDTO';
import { getCustomRepository} from 'typeorm';
import Reposiory from '../infra/typeorm/repository/UserRepository';
import AppError from '@shared/errors/AppError';

import Jwt from '../config/jwt';

import { sign } from 'jsonwebtoken';


import { compare } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';

interface ResponseType{
    token: string;
    user: User;
}

class AuthUserService{
    public async execute({ email,password }:AuthUSerDTO): Promise<ResponseType>{

        const repository =  getCustomRepository(Reposiory);
        const user = await repository.findByEmail(email);

        if(!user){
            throw new AppError('incorrect email or password combination');
        }

        const validPassword = await compare(password,user.password);

        if(!validPassword){
            throw new AppError('incorrect email or password combination');
        }

        const { expiresIn,secret } = Jwt;

        const token = sign({},secret,{ 
            subject: user.id,
            expiresIn
        })

        return { user,token };
    }
}

export default AuthUserService;