

import express from 'express';
import ResetPasswordcontroller from '../controllers/ResetEmailController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import { Joi,celebrate,Segments  } from 'celebrate';

const routes = express.Router();


const resetPassword = new ResetPasswordcontroller();
const forgotPassword = new ForgotPasswordController();


routes.post('/reset',
    celebrate({
        [ Segments.BODY ]:{
            token:  Joi.string().uuid().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.string().valid(Joi.ref('password'))
        }
    }),
    resetPassword.create);
    
routes.post(
    '/forgot',
    celebrate({
        [ Segments.BODY ]: {
            email: Joi.string().email().required()
        }
    }),
forgotPassword.create);




export default routes;