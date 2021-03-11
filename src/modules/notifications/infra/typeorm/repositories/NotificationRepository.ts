
import { getMongoRepository, MongoRepository } from 'typeorm';

import createNotificationDTO from '@modules/notifications/dto/createNotificationDTO';
import INoticationRepository from '@modules/notifications/repositories/INoticationRepository';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';



class NotificationRepository implements INoticationRepository{

    private ormRepository: MongoRepository<Notification>;

    constructor(){
          this.ormRepository = getMongoRepository(Notification,'mongo');
    }

    public async create({ content,recipient_id }:createNotificationDTO): Promise<Notification>{

        const notification = this.ormRepository.create({ 
            recipient_id,
            content,
        });

        await this.ormRepository.save(notification);


        return notification;
    }

}

export default NotificationRepository;