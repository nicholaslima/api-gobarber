

import { container } from 'tsyringe';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repository/AppointmentsRepository';
import IAppointmentRepository from "@modules/appointments/repositories/IAppointmentRepository";


import '@modules/users/providers/Hashprovider';

import './providers';

import UsersRepository from '@modules/users/infra/typeorm/repository/UserRepository';
import IUsersRepository from "modules/users/repositories/IUsersRepositories";

import UsersTokenRepository from '@modules/users/infra/typeorm/repository/userTokenRepository';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepositories';


import INoticationRepository from '@modules/notifications/repositories/INoticationRepository';
import NotificationRepository from '@modules/notifications/infra/typeorm/repositories/NotificationRepository';

container.registerSingleton<INoticationRepository>('NotificationRepository',NotificationRepository);
container.registerSingleton<IAppointmentRepository>('AppointmentRepository',AppointmentRepository);
container.registerSingleton<IUsersRepository>('UsersRepository',UsersRepository);
container.registerSingleton<IUsersTokenRepository>('UsersTokenRepository',UsersTokenRepository);


