

interface IcacheProvider{
    save(Key: string,value: any): Promise<void>;
    recover<T>(Key: string): Promise<T | null>;
    invalidate(Key: string): Promise<void>;
}


export default IcacheProvider;