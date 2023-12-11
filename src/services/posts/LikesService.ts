import { Prisma } from 'prisma/client';
import NotificationsService, { NotificationMessages, NotificationType } from 'services/notifications/NotificationsService';
import StringUtils from 'utils/StringUtils';

const notificationsService = new NotificationsService();
const stringUtils = new StringUtils();

export default class LikesService {
  async fetchLikesFromPost(postId: number) {
    return await Prisma.like.findMany({
      where: {
        postId,
      },
    });
  }

  async createLikeInPost(userId: number, postId: number) {
    const like =  await Prisma.like.create({
      data: {
        userId,
        postId,
      },
    });

    if (like) {
      const user = await Prisma.user.findFirst({
        where: {
          id: userId,
        }
      })

      const post = await Prisma.post.findFirst({
        where: {
          id: postId,
        }
      })
  
      if (user && post) {
        await notificationsService.createNotification({
          userId: post.ownerId,
          fromId: userId,
          content: stringUtils.replacePlaceholder(NotificationMessages.LikedPost, user.name, post.content),
          type: NotificationType.LikedPost
        })
      }
    }

    return like;
  }

  async findLikeByPostIdAndUserId(userId: number, postId: number) {
    return await Prisma.like.findFirst({
      where: {
        userId,
        postId
      }
    })
  }

  async deleteLikeInPost(userId: number, postId: number) {
    return await Prisma.like.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
  }
}
