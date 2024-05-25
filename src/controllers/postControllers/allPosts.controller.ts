import { Request, Response } from "express";

export async function allPostsController(req: Request, res: Response) {
    res.status(200).send('all post controller works fine');
}