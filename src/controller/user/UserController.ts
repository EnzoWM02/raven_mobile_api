import { User } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import UserService from "services/user/UserService";

const userControllerRouter = Router();
const userService = new UserService();

interface UserRequest extends Request {
  body: User;
}

userControllerRouter.get("/", async (req: UserRequest, res: Response) => {
  try {
    res.send(await userService.findAllUsers());
  } catch (e) {}
});

userControllerRouter.get(
  "/:id",
  async (req: UserRequest, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const user = await userService.findUserById(id);

    if (!user) return next(new Error("User not found"));

    res.status(200).send(user);
  }
);

userControllerRouter.post("/", async (req: UserRequest, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).send(user);
  } catch (e) {
    res.status(502).end(e);
  }
});

userControllerRouter.delete("/", async (req: UserRequest, res: Response) => {});

userControllerRouter.post("/login",async (req:UserRequest, res: Response) => {
  try {
    const user = await userService.findUserByEmailAndPassword(req.body);
    if (!user) {
      return res.status(404).send();
    }
    return res.status(200).send(user);
  } catch (e) {
    res.status(502).end(e);
  }
})

export default userControllerRouter;
