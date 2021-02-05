

import { container } from 'tsyringe';

import BcryptHashProvider from '@modules/users/providers/Hashprovider/implementations/BcryptHashProvider';
import IHashProvider from '@modules/users/providers/Hashprovider/models/IHashProvider';

container.registerSingleton<IHashProvider>('hashProvider',BcryptHashProvider);