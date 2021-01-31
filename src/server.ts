
import 'reflect-metadata';
import 'express-async-errors';
import express,{Request,Response,NextFunction} from 'express';
import '@shared/infra/typeorm/index';
import routes from '@shared/infra/http/routes';
import uploadAvatarConfig from '@modules/users/config/upload';
import AppError from '@shared/errors/AppError';

const App = express();

App.use(express.json());
App.use('/file',express.static(uploadAvatarConfig.directory));
App.use(routes);

routes.use((error: Error,request: Request,response: Response,next: NextFunction) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            message: error.message,
            status: error.statusCode,
        });
    }

    return response.status(500).json({
        message: 'internal Error',
        status: 500,
    })
})

App.listen(3333,() => {
    console.log('server is runing in port 3333');
});