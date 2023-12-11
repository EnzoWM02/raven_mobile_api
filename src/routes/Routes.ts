import helloWorldController from 'controller/helloWorld/HelloWorldController';
import notificationControllerRouter from 'controller/notifications/NotificationController';
import postsControllerRouter from 'controller/posts/PostsController';
import searchControllerRouter from 'controller/search/SearchController';
import userControllerRouter from 'controller/user/UserController';
import { Router } from 'express';
import handleAuth from 'middlewares/auth/handleAuth';

const routes = Router();

routes.use(handleAuth);
routes.use('/user', userControllerRouter);
routes.use('/hello', helloWorldController);
routes.use('/post', postsControllerRouter);
routes.use('/search', searchControllerRouter);
routes.use('/notification', notificationControllerRouter);

export default routes;
