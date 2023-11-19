import { NextFunction, Request, Response } from 'express';
import HttpError from 'utils/HttpError';

export default function handleHttpError(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof HttpError) {
    res.status(err.status).send(err.message);
    console.error(err.stack);
  }

  next(err);
}
