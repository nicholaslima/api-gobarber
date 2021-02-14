
import IMailtemplateProvider from './models/IMailTemplateProvider';
import MailTenplateProvider from './implementations/HandlebarsMailTemplateProvider';

import { container } from 'tsyringe';


container.registerSingleton<IMailtemplateProvider>('MailTemplateProvider',MailTenplateProvider);

