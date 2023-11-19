import { NextFunction, Request, Response, Router } from 'express';
import UserService from 'services/user/UserService';
import HttpError from 'utils/HttpError';

const registerAccountController = Router();
const userService = new UserService();

export interface CreateAccountRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
    birthDate: Date;
    uniqueKey: string;
  };
}

registerAccountController.post('/', async (req: CreateAccountRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.body) {
      throw new HttpError('Missing user information', 401);
    }

    const user = await userService.createInitialUser(req.body);

    if (user) {
      res.status(201);
      res.end();
    }
  } catch (err) {
    next(err);
  }
});

export default registerAccountController;
