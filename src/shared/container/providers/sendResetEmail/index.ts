

import { container } from 'tsyringe';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import ISendEmailReset from './models/ISendResetEmailProvider';

container.registerInstance<ISendEmailReset>('SendResetEmailProvider',new EtherealMailProvider());