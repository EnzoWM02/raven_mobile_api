import { Request, Response, Router } from "express";

//This is for testing purposes

const helloWorldController = Router();

helloWorldController.get('/', (req: Request, res: Response) => {
    res.send('Hello World!!!');
})

export default helloWorldController;