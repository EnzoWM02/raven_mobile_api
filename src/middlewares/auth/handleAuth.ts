import { NextFunction, Request, Response } from 'express';
import LoginTokenService from 'services/loginToken/LoginTokenService';
import HttpError from 'utils/HttpError';
import { env } from 'config/globals';

export default async function handleAuth(req: Request, res: Response, next: NextFunction) {
  const loginTokenService = new LoginTokenService();
  const headerToken = req.header('token');
  if (typeof headerToken === 'string') {

    //This if for development purpose
    if (headerToken === env.DUMMY_TOKEN) {
      return next();
    }

    const [token, userId] = headerToken?.split('/');
    if (token && userId) {
        const loginToken = await loginTokenService.findByTokenAndUserId(token, parseInt(userId));
        if (loginToken) {
          return next();
        }
    }
  }

  return next(new HttpError('Invalid credentials for current request', 401));
}
