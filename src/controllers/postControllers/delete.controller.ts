import { Request, Response } from "express";

export async function deletePostController(req: Request, res: Response) {
    res.status(200).send('delete post controller working');
}