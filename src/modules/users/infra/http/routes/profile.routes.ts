

import app from 'express';
import ProfileControler from '../controllers/ProfileController';
import authentication from '@shared/infra/http/middlewares/MiddlewareToken';
import { celebrate,Joi,Segments } from 'celebrate';

const routes = app.Router();

const profileControler = new ProfileControler();

routes.use(authentication);

routes.get('/',profileControler.show);
routes.put(
    '/',
    celebrate({
        [ Segments.BODY ]:{
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string(),
            old_password: Joi.string(),
            password_confirmation: Joi.string().valid(Joi.ref('password')),
        }
    }),
    profileControler.update
);

export default routes;