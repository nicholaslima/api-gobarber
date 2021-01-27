

import express from 'express';
import appointmentController from '../controllers';

const AppointmentsRoutes = express.Router();
const Controller = new appointmentController();

AppointmentsRoutes.post('/appointments',Controller.create);

export default AppointmentsRoutes;