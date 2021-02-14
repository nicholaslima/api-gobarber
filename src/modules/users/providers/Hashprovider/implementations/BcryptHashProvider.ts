
import IHashProvider from '../models/IHashProvider';
import { compare,hash } from 'bcryptjs';


class HashProvider implements IHashProvider{
    public async compareHash(value: string,hashed: string): Promise<Boolean>{
        return compare(value,hashed);
    }

    public async generateHash(value: string): Promise<string>{
        return hash(value,8);
    }
}


export default HashProvider;