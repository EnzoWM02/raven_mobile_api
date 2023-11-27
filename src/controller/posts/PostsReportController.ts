import { Report } from '@prisma/client';
import { NextFunction, Request, Response, Router } from 'express';
import PostsReportService from 'services/posts/PostsReportService';
import HttpError from 'utils/HttpError';

const postsReportControllerRouter = Router();
const postsReportService = new PostsReportService();

interface PostReportRequest extends Request {
  body: Report;
}

postsReportControllerRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(await postsReportService.findAllPostReports());
  } catch (e) {
    next(new HttpError('Unable to fetch all Posts Reports', 404, e));
  }
});

postsReportControllerRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (!id) return next(new HttpError(`This request needs a post id`, 405));
  try {
    const report = await postsReportService.findPostReport(id);
    if (!report) throw new HttpError(`Post report with id ${id} not found`, 404);

    res.status(200).send(report);
  } catch (e) {
    next(e);
  }
});

postsReportControllerRouter.post('/', async (req: PostReportRequest, res: Response, next: NextFunction) => {
  try {
    const report = await postsReportService.createPostReport(req.body);
    res.status(201).send(report);
  } catch (e) {
    next(new HttpError('Could not create post report', 502, e));
  }
});

postsReportControllerRouter.delete('/:id', async (req: PostReportRequest, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (!id) return next(new HttpError(`This request needs a post id`, 405));

  try {
    await postsReportService.deletePostReport(id);
  } catch (e) {
    next(new HttpError('Could not delete post report', 502, e));
  }
});

export default postsReportControllerRouter;
