

import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import IStorageProvides from './model/IStorageProvider';

import diskStorageProvider from './implementations/diskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
    disk: diskStorageProvider,
    s3: S3StorageProvider,
}

container.registerSingleton<IStorageProvides>(
    'UploadProvider',
    providers[uploadConfig.driver]
);