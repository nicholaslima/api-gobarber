

import express from 'express';
import { Segments,celebrate,Joi } from 'celebrate';
const userRoutes = express.Router();
import UserController from '../controllers/UsersController';
import MiddlewareToken from '@shared/infra/http/middlewares/MiddlewareToken';
import multer from 'multer';
import multerConfig from '@config/upload';


const users = new UserController();

const upload = multer(multerConfig.multer);

userRoutes.post(
    '/',
    celebrate({
        [ Segments.BODY ]:{
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    }),
    users.create
);

userRoutes.patch('/upload',
                MiddlewareToken,
                upload.single('avatar'),
                users.UploadAvatar
);

export default userRoutes;