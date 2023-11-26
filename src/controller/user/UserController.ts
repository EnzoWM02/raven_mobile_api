import { User } from '@prisma/client';
import { NextFunction, Request, Response, Router } from 'express';
import UserService from 'services/user/UserService';
import HttpError from 'utils/HttpError';

const userControllerRouter = Router();
const userService = new UserService();

export interface UserRequest extends Request {
  body: User;
}

userControllerRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await userService.findAllUsers());
  } catch (e) {
    next(new HttpError('Unable to fetch all Users'));
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
    next(e);
  }
});

userControllerRouter.post('/', async (req: UserRequest, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).send(user);
  } catch (e) {
    throw new HttpError('Could not create user', 502);
  }
});

userControllerRouter.delete('/', async () => {});

export default userControllerRouter;
