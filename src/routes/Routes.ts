import helloWorldController from 'controller/helloWorld/HelloWorldController';
import postsControllerRouter from 'controller/posts/PostsController';
import postsReportControllerRouter from 'controller/posts/PostsReportController';
import userControllerRouter from 'controller/user/UserController';
import { Router } from 'express';
import handleAuth from 'middlewares/auth/handleAuth';

const routes = Router();

routes.use(handleAuth);
routes.use('/user', userControllerRouter);
routes.use('/hello', helloWorldController);
routes.use('/post', postsControllerRouter);
routes.use('/postreport', postsReportControllerRouter);

export default routes;
