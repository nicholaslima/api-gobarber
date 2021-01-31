

import express,{ Response,Request,NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import Jwt from '@modules/users/config/jwt';
import AppError from '@shared/errors/AppError';

const routes = express.Router();

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
  }

routes.use((request:Request,response:Response,next:NextFunction) => {
    const tokenBearer = request.headers.authorization;
    console.log(tokenBearer);
    if(!tokenBearer){
        throw new AppError('token is missing');
    }

    const [,token] = tokenBearer.split(' ');

    try{ 
        const { secret } = Jwt;
        const isValidToken = verify(token,secret);

        const { sub } = isValidToken as TokenPayload;

        request.user = {
            id: sub
        }
       return next();
    }catch(err){
        throw new AppError('invalid jwt token');
    }
});


export default routes;