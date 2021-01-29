

import express from 'express';
import AppointmentRoutes from '@modules/appointments/http/routes';
import UserRoutes from '@modules/users/http/routes';

const routes = express.Router();


routes.use(AppointmentRoutes);
routes.use(UserRoutes);


export default routes;


