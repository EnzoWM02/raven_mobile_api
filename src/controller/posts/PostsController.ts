import { Post } from '@prisma/client';
import { NextFunction, Request, Response, Router } from 'express';
import LikesService from 'services/posts/LikesService';
import PostsService from 'services/posts/PostsService';
import HttpError from 'utils/HttpError';
import postsReportControllerRouter from './PostsReportController';
import commentsControllerRoute from './CommentsController';

const postsControllerRouter = Router();
const postsService = new PostsService();
const likesService = new LikesService();

interface PostRequest extends Request {
  body: Post;
}

interface LikeRequest extends Request {
  body: {
    userId: number,
  }
}

postsControllerRouter.use('/report', postsReportControllerRouter);
postsControllerRouter.use('/comment', commentsControllerRoute);

postsControllerRouter.get('/:ownerId/following', async (req: Request, res: Response, next: NextFunction) => {
  const ownerId = parseInt(req.params.ownerId);
  if (!ownerId) return next(new HttpError(`This request needs a post id`, 405));
  try {
    const posts = await postsService.findPostByUserFollowing(ownerId);

    res.status(200).send(posts);
  } catch (e) {
    next(new HttpError('Unable to fetch post', 404, e));
  }
})

postsControllerRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await postsService.findAllPosts());
  } catch (e) {
    next(new HttpError('Unable to fetch all Posts', 404, e));
  }
});

postsControllerRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (!id) return next(new HttpError(`This request needs a post id`, 405));
  try {
    const post = await postsService.findPost(id);
    if (!post) throw new HttpError(`Post with id ${id} not found`, 404);

    res.status(200).send(post);
  } catch (e) {
    next(new HttpError('Unable to fetch post', 404, e));
  }
});

postsControllerRouter.get('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (!id) return next(new HttpError(`This request needs a post id`, 405));
  try {
    const post = await postsService.findPostByUserId(id);
    if (!post) throw new HttpError(`User with id ${id} not found`, 404);

    res.status(200).send(post);
  } catch (e) {
    next(new HttpError('Unable to get post for user', 404, e));
  }
});

postsControllerRouter.post('/', async (req: PostRequest, res: Response, next: NextFunction) => {
  try {
    const post = await postsService.createPost(req.body);
    res.status(201).send(post);
  } catch (e) {
    next(new HttpError('Could not create post', 502, e));
  }
});

postsControllerRouter.post('/:id/like', async (req: LikeRequest, res: Response, next: NextFunction) => {
  const postId = parseInt(req.params.id);
  if (!postId) return next(new HttpError(`This request needs a post id`, 405));

  try {
    const postLike = await likesService.findLikeByPostIdAndUserId(req.body.userId, postId);

    if (postLike) {
      await likesService.deleteLikeInPost(req.body.userId, postId);
      return res.status(200).send('Deleted');
    }

    const like = await likesService.createLikeInPost(req.body.userId, postId);
    res.status(201).send(like);
  } catch (e) {
    next(new HttpError('Could not like a post', 502, e));
  }
})

postsControllerRouter.put('/:id', async (req: PostRequest, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (!id) return next(new HttpError(`This request needs a post id`, 405));

  try {
    const updatedPost = await postsService.updatePost(req.body, id);
    res.status(200).send(updatedPost);
  } catch (e) {
    next(new HttpError('Could not update post', 502, e));
  }
});

postsControllerRouter.delete('/:id', async (req: PostRequest, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (!id) return next(new HttpError(`This request needs a post id`, 405));

  try {
    await postsService.deletePost(id);
  } catch (e) {
    next(new HttpError('Could not delete post', 502, e));
  }
});

export default postsControllerRouter;
