
import IStorageProvider from '../model/IStorageProvider';


class FakeStorageProvider implements IStorageProvider{
    private files: string[] = [];

    public async saveFile(fileName: string): Promise<string>{
        this.files.push(fileName);

        return fileName;
    }


    public async  deleteFile(filename: string): Promise<void>{
        const index = this.files.findIndex( file => file === filename);

        this.files.splice(index,1);
    }
}


export default FakeStorageProvider;