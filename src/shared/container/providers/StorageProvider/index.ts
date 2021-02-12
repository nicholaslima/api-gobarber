

import { container } from 'tsyringe';
import IStorageProvides from './model/IStorageProvider';
import diskStorageProvider from './implementations/diskStorageProvider';

container.registerSingleton<IStorageProvides>('UploadProvider',diskStorageProvider);