import { User, UserProfile } from '@prisma/client';
import { NextFunction, Request, Response, Router } from 'express';
import UserService from 'services/user/UserService';
import HttpError from 'utils/HttpError';

const userControllerRouter = Router();
const userService = new UserService();

export interface UserRequest extends Request {
  body: {
    user: User,
    userProfile: UserProfile,
  };
}

interface FollowingRequest extends Request {
  body: {
    userId: number,
  }
}

userControllerRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await userService.findAllUsers());
  } catch (e) {
    next(new HttpError('Unable to fetch all Users', 404, e));
  }
});

userControllerRouter.get('/:id', async (req: UserRequest, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (!id) return next(new HttpError('This request needs an id param', 405));

  try {
    const user = await userService.findUserById(id);
    if (!user) throw new HttpError(`User with id: ${id} not found`, 404);

    res.status(200).send(user);
  } catch (e) {
    next(new HttpError('Unable to fetch User', 404, e));
  }
});

userControllerRouter.post('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    req.body.user.birthDate = new Date(req.body.user.birthDate);
    const user = await userService.createUser(req.body);
    res.status(201).send(user);
  } catch (e) {
    next(new HttpError('Could not create user', 502, e));
  }
});

userControllerRouter.put('/:id', async (req: UserRequest, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (!id) return next(new HttpError(`This request needs a post id`, 405));

  try {
    const updatedPost = await userService.updateUser(req.body, id);
    res.status(200).send(updatedPost);
  } catch (e) {
    next(new HttpError('Could not update post', 502, e));
  }
});

userControllerRouter.delete('/', async (req: UserRequest, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (!id) return next(new HttpError(`This request needs a post id`, 405));

  try {
    await userService.deleteUserById(id);
  } catch (e) {
    next(new HttpError('Could not delete post report', 502, e));
  }
});

userControllerRouter.post('/:id/follow', async (req: FollowingRequest, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (!id) return next(new HttpError(`This request needs an user id`, 405));

  try {
    const followObj = await userService.toggleFollowOnUser(id, req.body.userId);
    res.status(200).send(followObj);
  } catch (e) {
    next(new HttpError('Could not toggle user follow', 502, e));
  }
})

userControllerRouter.get('/:id/followedBy', async (req: FollowingRequest, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (!id) return next(new HttpError(`This request needs an user id`, 405));

  try {
    const followObj = await userService.findUserFollowedBy(id);
    res.status(200).send(followObj);
  } catch (e) {
    next(new HttpError('Could not find user followers', 502, e));
  }
})

userControllerRouter.get('/:id/following', async (req: FollowingRequest, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (!id) return next(new HttpError(`This request needs an user id`, 405));

  try {
    const followObj = await userService.findUserFollowings(id);
    res.status(200).send(followObj);
  } catch (e) {
    next(new HttpError('Could not find user followings', 502, e));
  }
})

userControllerRouter.post('/:id/isFollowing', async (req: FollowingRequest, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (!id) return next(new HttpError(`This request needs an user id`, 405));

  try {
    const isFollowing = await userService.userIsFollowing(id, req.body.userId);
    if (isFollowing > 0) {
      return res.status(200).send(true);
    }
    return res.status(200).send(false);
  } catch (e) {
    next(new HttpError('Could not find user followings', 502, e));
  }
})


export default userControllerRouter;
