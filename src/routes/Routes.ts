import helloWorldController from 'controller/helloWorld/HelloWorldController';
import userControllerRouter from 'controller/user/UserController';
import { Router } from 'express';

const routes = Router();

routes.use('/user', userControllerRouter);
routes.use('/hello', helloWorldController);

export default routes;
