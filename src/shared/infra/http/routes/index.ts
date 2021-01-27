

import express from 'express';
import AppointmentRoutes from '@modules/appointments/http/routes';

const routes = express.Router();


routes.use(AppointmentRoutes);

export default routes;


