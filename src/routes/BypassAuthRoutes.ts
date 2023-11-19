import registerAccountController from 'controller/login/RegisterAccountController';
import loginControllerRoute from 'controller/login/LoginController';
import { Router } from 'express';

const bypassAuthRoutes = Router();

bypassAuthRoutes.use('/login', loginControllerRoute);
bypassAuthRoutes.use('/register', registerAccountController);

export default bypassAuthRoutes;
