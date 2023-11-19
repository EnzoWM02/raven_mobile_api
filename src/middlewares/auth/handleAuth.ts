import { NextFunction, Request, Response } from 'express';
import LoginTokenService from 'services/loginToken/LoginTokenService';
import HttpError from 'utils/HttpError';

export default async function handleAuth(req: Request, res: Response, next: NextFunction) {
  const loginTokenService = new LoginTokenService();
  const headerToken = req.header('token');
  if (typeof headerToken === 'string') {
    const [token, userId] = headerToken?.split('/');
    if (token && userId) {
        const loginToken = await loginTokenService.findByTokenAndUserId(token, parseInt(userId));
        if (loginToken) {
          next();
        }
    }
  }

  next(new HttpError('Invalid credentials for current request', 401));
}
