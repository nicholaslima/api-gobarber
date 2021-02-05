
import IHashprovider from '@modules/users/providers/Hashprovider/models/IHashProvider';

class FakeHashProvider implements IHashprovider{

    public async generateHash(value: string): Promise<string>{
        return value;
    }

    public async compareHash(value: string, hashed: string){
        return value === hashed;
    }

}

export default FakeHashProvider;