
import ICacheProvider from '../models/ICacheProvider';


interface cacheType{
    [ key: string ]: string;
}


class FakeCacheProvider implements ICacheProvider{
    private cache:cacheType = {};

    public async save(key: string,value: string){
        this.cache[key] = JSON.stringify(value);
    }


    public async invalidate(Key:string){
        delete this.cache[Key];
    }

    public async recover<T>(Key: string): Promise<T | null>{
        
        const data = this.cache[Key];

        if(!data){
            return null
        }

        const parsedData = JSON.parse(data);

        return parsedData as T;
    }

    public async invalidatePrefix(prefix: string){
        const keys = Object.keys(this.cache).filter( 
            key => key.startsWith(`${ prefix }:`
        ));

        keys.forEach(key => {
            delete this.cache[key];
        });
    }
}

export default FakeCacheProvider;