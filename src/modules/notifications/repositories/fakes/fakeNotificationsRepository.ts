
import { ObjectID } from 'mongodb';
import INoticationRepository from '../INoticationRepository';
import createNotificationDTO from '../../dto/createNotificationDTO';
import Notification from '../../infra/typeorm/schemas/Notification';

class fakeNotificationsRepository implements INoticationRepository{
    private notifications: Notification[] = [];


    public async create({ content,recipient_id }: createNotificationDTO){

        let notification = new Notification();
        Object.assign(notification,{id: new ObjectID(), content,recipient_id });

        this.notifications.push(notification);

        return notification;
    }
}

export default fakeNotificationsRepository;