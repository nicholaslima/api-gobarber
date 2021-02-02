

import express from 'express';
import AppointmentRoutes from '@modules/appointments/infra/http/routes/appointment.routes';
import UserRoutes from '@modules/users/infra/http/routes/user.routes';
import sessionRoutes from '@modules/users/infra/http/routes/sessions.routes';


const routes = express.Router();



routes.use('/appointments',AppointmentRoutes);
routes.use('/users',UserRoutes);
routes.use('/session',sessionRoutes);


export default routes;


