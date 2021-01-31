

import express from 'express';
import AppointmentRoutes from '@modules/appointments/http/routes/appointment.routes';
import UserRoutes from '@modules/users/http/routes/user.routes';
import sessionRoutes from '@modules/users/http/routes/sessions.routes';


const routes = express.Router();



routes.use('/appointments',AppointmentRoutes);
routes.use('/users',UserRoutes);
routes.use('/session',sessionRoutes);


export default routes;


