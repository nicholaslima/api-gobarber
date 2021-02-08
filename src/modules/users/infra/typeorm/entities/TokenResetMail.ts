


import { Column, 
    CreateDateColumn, 
    Entity,
    Generated,
    PrimaryGeneratedColumn, 
    UpdateDateColumn } from 'typeorm';


@Entity('users_token')

class TokenResetMail{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default TokenResetMail;