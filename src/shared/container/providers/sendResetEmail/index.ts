

import { container } from 'tsyringe';
import sendResetEmailProvider from './implementations/sendResetEmailProvider';
import ISendEmailReset from './models/ISendResetEmailProvider';

container.registerSingleton<ISendEmailReset>('sendResetEmailProvider',sendResetEmailProvider);