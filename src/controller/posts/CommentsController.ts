import { Comment } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import CommentsService from "services/posts/CommentsService";
import HttpError from "utils/HttpError";

const commentsControllerRoute = Router();
const commentsService = new CommentsService();

interface CommentRequest extends Request {
    body: Comment,
}

commentsControllerRoute.get('/:postId', async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.postId);
    if (!id) return next(new HttpError(`This request needs a post id`, 405));

    try {
        const comments = await commentsService.findCommentsForPost(id);
        res.status(200).send(comments);
    } catch (e) {
        next(new HttpError('Unable to fetch comments for post', 404, e));
    }
})

commentsControllerRoute.post('/', async (req: CommentRequest, res: Response, next: NextFunction) => {
    try {
        const comment = await commentsService.createComment(req.body);
        res.status(201).send(comment);
    } catch (e) {
        next(new HttpError('Unable to create comment in post', 404, e));
    }
});

commentsControllerRoute.delete('/:id',  async (req: CommentRequest, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    if (!id) return next(new HttpError(`This request needs a post id`, 405));
    
    try {
        await commentsService.deleteComment(id);
        res.status(200).end();
    } catch (e) {
        next(new HttpError('Could not delete comment', 404, e));
    }
})


export default commentsControllerRoute;