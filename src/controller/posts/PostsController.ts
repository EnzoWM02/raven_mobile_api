import { Post } from '@prisma/client';
import { NextFunction, Request, Response, Router } from 'express';
import PostsService from 'services/posts/PostsService';
import HttpError from 'utils/HttpError';

const postsControllerRouter = Router();
const postsService = new PostsService();

interface PostRequest extends Request {
  body: Post;
}

postsControllerRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await postsService.findAllPosts());
  } catch (e) {
    next(new HttpError('Unable to fetch all Posts'));
  }
});

postsControllerRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (!id) return next(new HttpError(`This request needs a post id`, 405));
  try {
    const post = await postsService.findPost(id);
    console.log(post);
    if (!post) throw new HttpError(`Post with id ${id} not found`, 404);

    res.status(200).send(post);
  } catch (e) {
    next(e);
  }
});

postsControllerRouter.post('/', async (req: PostRequest, res: Response, next: NextFunction) => {
  try {
    const post = await postsService.createPost(req.body);
    console.log(`poststst`, post);
    res.status(201).send(post);
  } catch (e) {
    next(new HttpError('Could not create post', 502));
  }
});

postsControllerRouter.put('/:id', async (req: PostRequest, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (!id) return next(new HttpError(`This request needs a post id`, 405));

  try {
    const updatedPost = await postsService.updatePost(req.body, id);
    res.status(200).send(updatedPost);
  } catch (e) {
    next(new HttpError('Could not update post', 502));
  }
});

postsControllerRouter.delete('/:id', async (req: PostRequest, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    if (!id) return next(new HttpError(`This request needs a post id`, 405));

    try {
        await postsService.deletePost(id);
    } catch (e) {
        next(new HttpError('Could not delete post', 502));
      }
})

export default postsControllerRouter;
