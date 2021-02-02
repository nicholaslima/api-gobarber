
import AuthUSerDTO from '../dto/authUserDTO';
import IUserRepository from '@modules/users/repositories/IUsersRepositories';

import AppError from '@shared/errors/AppError';
import { inject,injectable } from 'tsyringe';
import Jwt from '../config/jwt';

import { sign } from 'jsonwebtoken';


import { compare } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';

interface ResponseType{
    token: string;
    user: User;
}

@injectable()
class AuthUserService{

    constructor(
        @inject('UsersRepository')
        private ormReposiory: IUserRepository
    ){}
    
    public async execute({ email,password }:AuthUSerDTO): Promise<ResponseType>{
        const user = await this.ormReposiory.findByEmail(email);

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