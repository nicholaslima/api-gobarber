
import { Entity, PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities';

@Entity('appointments')

class Appointment{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id'})
    user: User;

    @UpdateDateColumn()
    update_at: Date;
}

export default Appointment;