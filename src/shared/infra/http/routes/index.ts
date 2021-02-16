

import express from 'express';
import AppointmentRoutes from '@modules/appointments/infra/http/routes/appointment.routes';
import UserRoutes from '@modules/users/infra/http/routes/user.routes';
import sessionRoutes from '@modules/users/infra/http/routes/sessions.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';
import ProfileRoutes from '@modules/users/infra/http/routes/profile.routes';
import providers from '@modules/appointments/infra/http/routes/providers.routes';

const routes = express.Router();



routes.use('/appointments',AppointmentRoutes);
routes.use('/users',UserRoutes);
routes.use('/session',sessionRoutes);
routes.use('/password',passwordRoutes);
routes.use('/profile',ProfileRoutes);
routes.use('/providers',providers);

export default routes;


