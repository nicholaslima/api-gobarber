

import createNotificationDTO from '@modules/notifications/dto/createNotificationDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

interface INotificationRepository{
    create({ recipient_id,content }: createNotificationDTO): Promise<Notification>;
}

export default INotificationRepository;