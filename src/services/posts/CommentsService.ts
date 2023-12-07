import { Comment } from '@prisma/client';
import { Prisma } from 'prisma/client';

export default class CommentsService {
  async findCommentsForPost(postId: number) {
    return await Prisma.comment.findMany({
      where: {
        originalPostId: postId,
      },
      include: {
        owner: true,
      },
    });
  }

  async createComment(comment: Comment) {
    return await Prisma.comment.create({
      data: {
        ...comment,
      },
    });
  }

  async editComment(commentId: number, comment: Comment) {
    return await Prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        ...comment,
      },
    });
  }

  async deleteComment(commendId: number) {
    return await Prisma.comment.delete({
      where: {
        id: commendId,
      },
    });
  }
}
