

import { Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from 'typeorm';
import { Expose,Exclude } from 'class-transformer';
import { string } from '@hapi/joi';
import uploadConfig from '@config/upload';

@Entity('users')

class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @Expose({name: 'avatar_url' })
    getAvatarUrl(): string | null{
        if(!this.avatar){
            return null;
        }
        switch(process.env.STORAGE_DRIVER){
            case 's3': 
                return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
            case 'disk': 
                return `${ process.env.APP_URL_API }/file/${ this.avatar }`
            default: 
                return null;
        }
    }
}

export default User;