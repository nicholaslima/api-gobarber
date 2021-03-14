import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';
import { errors } from 'celebrate';
import express,{Request,Response,NextFunction} from 'express';
import '@shared/infra/typeorm/index';
import routes from '@shared/infra/http/routes';
import uploadAvatarConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import "@shared/container";

const App = express();

App.use(express.json());
//rota para mostrar imagens do sistema
App.use('/file',express.static(uploadAvatarConfig.tmpFolder));
App.use(routes);
App.use(errors());

App.use((error: Error,request: Request,response: Response,next: NextFunction) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            message: error.message,
            status: error.statusCode,
        });
    }

    return response.status(500).json({
        message: error.message,
        status: 500,
    })
});

App.listen(process.env.APP_PORT,() => {
    console.log(`server is runing in port ${ process.env.APP_PORT }`);
});