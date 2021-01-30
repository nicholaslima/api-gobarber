

import express from 'express';
const routes = express.Router();
import UserController from '../controllers/UsersController';

const users = new UserController();

routes.post('/',users.create);

export default routes;