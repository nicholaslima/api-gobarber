

import express from 'express';
import appointmentController from '../controllers';
import MiddlewareToken from '@shared/infra/http/middlewares/MiddlewareToken';

const AppointmentsRoutes = express.Router();
const Controller = new appointmentController();


AppointmentsRoutes.use(MiddlewareToken);
AppointmentsRoutes.post('/',Controller.create);
AppointmentsRoutes.get('/',Controller.findAll);

export default AppointmentsRoutes;