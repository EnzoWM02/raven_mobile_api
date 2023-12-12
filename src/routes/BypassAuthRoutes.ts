import registerAccountController from 'controller/login/RegisterAccountController';
import loginControllerRoute from 'controller/login/LoginController';
import { Router } from 'express';
import helloWorldController from 'controller/helloWorld/HelloWorldController';

const bypassAuthRoutes = Router();

bypassAuthRoutes.use('/login', loginControllerRoute);
bypassAuthRoutes.use('/register', registerAccountController);
bypassAuthRoutes.use('/hello', helloWorldController);

export default bypassAuthRoutes;
