import { NextFunction, Request, Response, Router } from 'express';
import SearchService from 'services/search/SearchService';
import HttpError from 'utils/HttpError';

const searchControllerRouter = Router();
const searchService = new SearchService();

searchControllerRouter.get('/:term', async (req: Request, res: Response, next: NextFunction) => {
    const term = req.params.term;
    if (!term) return next(new HttpError(`This request needs a term param`, 405));
    try {
        const searchedPostsAndUsers = await searchService.findUserAndContentBySearch(term);
        res.status(200).send(searchedPostsAndUsers);
    } catch (e) {
        next(new HttpError('Unable to search', 404, e));
    }
})

export default searchControllerRouter;