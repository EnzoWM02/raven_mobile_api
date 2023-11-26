import { NextFunction, Request, Response, Router } from 'express';
import LoginService from 'services/login/LoginService';
import HttpError from 'utils/HttpError';

const loginControllerRoute = Router();
const loginService = new LoginService();

export interface ILogin {
  email: string;
  password: string;
  token?: string;
}

interface LoginRequest extends Request {
  body: ILogin;
}

loginControllerRoute.post('/', async (req: LoginRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw new HttpError('Missing login information', 401);
    }

    console.log(req.body);
    const token = await loginService.handleLogin(req.body);
    if (token) {
      res.status(202);
      res.send(token).end();
    }
  } catch (err) {
    next(err);
  }
});

export default loginControllerRoute;
