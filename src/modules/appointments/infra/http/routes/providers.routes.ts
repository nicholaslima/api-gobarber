

import express from 'express';
import AppointmentControler from '../controllers/AppointmentControler';
import MiddlewareAuth from '@shared/infra/http/middlewares/MiddlewareToken';

const providersRoutes = express.Router();
const appointmentControler = new AppointmentControler();

providersRoutes.use(MiddlewareAuth);

providersRoutes.get('/',appointmentControler.listProviders);


export default providersRoutes