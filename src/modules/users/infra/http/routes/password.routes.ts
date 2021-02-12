

import express from 'express';
import ResetPasswordcontroller from '../controllers/ResetEmailController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const routes = express.Router();


const resetPassword = new ResetPasswordcontroller();
const forgotPassword = new ForgotPasswordController();


routes.post('/reset',resetPassword.create);
routes.post('/forgot',forgotPassword.create);




export default routes;