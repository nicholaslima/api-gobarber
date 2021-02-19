
import { Entity, PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')

class Appointment{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @Column('uuid')
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id'})
    provider: User;

    @Column('uuid')
    user_id: string;
    
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @UpdateDateColumn()
    update_at: Date;
}

export default Appointment;