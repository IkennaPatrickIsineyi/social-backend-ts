import { allPostsController } from "../controllers/postControllers/allPosts.controller";
import { createPostController } from "../controllers/postControllers/create.controller";
import { deletePostController } from "../controllers/postControllers/delete.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { Router } from 'express';

const postRouter = Router();

postRouter.get("/", allPostsController);
postRouter.post("/create", authMiddleware, createPostController);
postRouter.delete("/delete", authMiddleware, deletePostController);


export { postRouter }