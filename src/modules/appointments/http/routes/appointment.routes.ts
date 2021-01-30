

import express from 'express';
import appointmentController from '../controllers';

const AppointmentsRoutes = express.Router();
const Controller = new appointmentController();

AppointmentsRoutes.post('/',Controller.create);
AppointmentsRoutes.get('/',Controller.findAll);

export default AppointmentsRoutes;