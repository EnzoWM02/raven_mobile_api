import { env } from "config/globals";
import { Router, Request, Response, NextFunction } from "express";

const httpSecurity = Router();

httpSecurity.use(function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", env.DOMAIN); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

export default httpSecurity;
