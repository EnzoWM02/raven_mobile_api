import { Notification } from '@prisma/client';
import { Prisma } from 'prisma/client';

export default class NotificationsService {
  async findNotificationsByUserId(userId: number) {
    return await Prisma.notification.findMany({
      where: {
        userId,
        active: true,
      },
    });
  }

  async createNotification (notifications: Notification) {
    return await Prisma.notification.create({
        data: {
            ...notifications,
            active: true,
        }
    })
  }

  async disableNotification (id: number) {
    return await Prisma.notification.update({
        where: {
            id,
        },
        data: {
            active: false,
        }
    })
  }

}
