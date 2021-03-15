

import express from 'express';
import { celebrate,Segments,Joi } from 'celebrate';

import AppointmentController from '../controllers/AppointmentControler';
import MiddlewareToken from '@shared/infra/http/middlewares/MiddlewareToken';
import AppointmentProviderController from '@modules/appointments/infra/http/controllers/AppointmentProviderController';

const AppointmentsRoutes = express.Router();


const appointmentController = new AppointmentController();
const appointmentProvider = new AppointmentProviderController();

AppointmentsRoutes.use(MiddlewareToken);
AppointmentsRoutes.post(
    '/',
    celebrate({
        [ Segments.BODY ]:{
            provider_id: Joi.string().uuid().required(),
            date: Joi.date(),
        }
    }),
    appointmentController.create
);
AppointmentsRoutes.get('/',appointmentController.findAll);
AppointmentsRoutes.get('/me',appointmentProvider.index);


export default AppointmentsRoutes;