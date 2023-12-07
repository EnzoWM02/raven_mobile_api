import { Post, User } from '@prisma/client';
import { Prisma } from 'prisma/client';

const SEARCH_LIMIT = 200;

export default class SearchService {
  async findUserAndContentBySearch(searchTerm: string) {
    const results = {
      posts: [] as Post[],
      users: [] as User[],
    };
    
    results.users = await Prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              search: searchTerm,
            },
          },
          {
            uniqueKey: {
              search: searchTerm,
            },
          },
        ],
      },
      take: SEARCH_LIMIT,
    });

    results.posts = await Prisma.post.findMany({
      where: {
        content: {
          search: searchTerm,
        },
      },
      take: SEARCH_LIMIT,
    });
    
    return results;
  }
}
