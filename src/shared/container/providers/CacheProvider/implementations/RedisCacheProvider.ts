

import Redis,{ Redis as RedisClient } from 'ioredis';
import CacheConfig from '@config/Cache';
import ICacheProvider from '../models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider{
    private client: RedisClient;

    constructor(){
        this.client = new Redis(CacheConfig.config.redis);
    }

    public async invalidate(Key: string):Promise<void>{
        await this.client.del(Key);
    }

    public async recover<T>(Key: string): Promise<T | null>{
        const data = await this.client.get(Key);

        if(!data){
            return null;
        }

        const parsedData = JSON.parse(data) as T;
        return parsedData;
    }

    public async save(Key: string,value: string): Promise<void>{
        await this.client.set(Key,JSON.stringify(value));
    }

    public async invalidatePrefix(prefix: string):Promise<void>{
        const keys = await this.client.keys(`${ prefix }:*`);

        const pipeline = this.client.pipeline();

        keys.forEach( key => {
            pipeline.del(key);
        })

        await pipeline.exec();
    }

}


export default RedisCacheProvider;