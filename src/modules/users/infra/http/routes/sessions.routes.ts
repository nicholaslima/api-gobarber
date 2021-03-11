
import express from 'express';
const routes = express.Router();
import {  celebrate,Joi,Segments } from 'celebrate';

import SessionsController from '../controllers/SessionsController';

const sessions = new SessionsController();

routes.post(
    '/auth',
    celebrate({
        [ Segments.BODY ]:{
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
    }),
    sessions.auth);


export default routes;