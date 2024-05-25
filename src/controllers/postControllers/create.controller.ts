import { Request, Response } from "express";

export async function createPostController(req: Request, res: Response) {
    res.status(200).send('create post controller working');
}