import { Notification } from '@prisma/client';
import { Prisma } from 'prisma/client';

export interface NotificationDTO {
  userId: number;
  content: string;
  fromId?: number;
  type?: string;
  postId?: number;
}

export enum NotificationType {
  UserFollowing = 'userFollowing',
  LikedPost = 'likedPost',
}

export enum NotificationMessages {
  UserFollowing = '{0} seguiu você!',
  LikedPost = '{0} deu like no seu post {1}',
}

export default class NotificationsService {
  async findNotificationsByUserId(userId: number) {
    return await Prisma.notification.findMany({
      where: {
        userId,
        active: true,
      },
    });
  }

  async createNotification(notifications: NotificationDTO) {
    return await Prisma.notification.create({
      data: {
        ...notifications,
        active: true,
      },
    });
  }

  async disableNotification(id: number) {
    return await Prisma.notification.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
  }
}
