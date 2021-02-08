

import { container } from 'tsyringe';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repository/AppointmentsRepository';
import IAppointmentRepository from "@modules/appointments/repositories/IAppointmentRepository";


import '@modules/users/providers/Hashprovider';
import './providers/StorageProvider';
import './providers/sendResetEmail';

import UsersRepository from '@modules/users/infra/typeorm/repository/UserRepository';
import IUsersRepository from "modules/users/repositories/IUsersRepositories";

container.registerSingleton<IAppointmentRepository>('AppointmentRepository',AppointmentRepository);
container.registerSingleton<IUsersRepository>('UsersRepository',UsersRepository);
