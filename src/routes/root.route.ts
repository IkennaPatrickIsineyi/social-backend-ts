import { rootController } from "../controllers/rootControllers/root.controller";
import { Router } from 'express';

const rootRouter = Router();

rootRouter.get("/", rootController);

export { rootRouter }