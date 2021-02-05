


interface IHashProvider{
    generateHash(value: string): Promise<string>;
    compareHash(value: string,hashed: string): Promise<Boolean>;
}


export default IHashProvider;