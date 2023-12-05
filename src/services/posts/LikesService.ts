import { Prisma } from 'prisma/client';

export default class LikesService {
  async fetchLikesFromPost(postId: number) {
    return await Prisma.like.findMany({
      where: {
        postId,
      },
    });
  }

  async createLikeInPost(userId: number, postId: number) {
    return await Prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
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
