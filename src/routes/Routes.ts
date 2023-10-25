import userControllerRouter from "controller/user/UserController";
import { Router } from "express";

const routes = Router();

routes.use("/user", userControllerRouter);

export default routes;
