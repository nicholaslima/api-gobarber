

import express from 'express';
const routes = express.Router();
import UserController from '../controllers';

const controller = new UserController();

routes.post('/user',controller.create);


export default routes;