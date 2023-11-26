import { Post } from '@prisma/client';
import { Prisma } from 'prisma/client';

export default class PostsService {
  async findAllPosts() {
    return await Prisma.post.findMany();
  }

  async findPost(id: number) {
    return await Prisma.post.findFirst({
      where: {
        id,
      },
    });
  }

  async createPost(post: Post) {
    const postCreated = await Prisma.post.create({
        data: {
            ...post
        }
    })
    return postCreated;
  }

  async updatePost(post: Post, id: number) {
    return await Prisma.post.update({
        where: {
            id
        },
        data: {
            ...post
        }
    })
  }

  async deletePost(id: number) {
    return await Prisma.post.delete({
        where: {
            id
        }
    })
  }
}
