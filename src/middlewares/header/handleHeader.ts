import { NextFunction, Request, Response } from 'express';

export default function handleHeader(req: Request, res: Response, next: NextFunction) {
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  next();
}
