

import express from 'express';
const userRoutes = express.Router();
import UserController from '../controllers/UsersController';
import MiddlewareToken from '@shared/infra/http/middlewares/MiddlewareToken';
import multer from 'multer';
import multerConfig from '@config/upload';


const users = new UserController();

const upload = multer(multerConfig);

userRoutes.post('/',users.create);

userRoutes.patch('/upload',
                MiddlewareToken,
                upload.single('avatar'),
                users.UploadAvatar
);

export default userRoutes;