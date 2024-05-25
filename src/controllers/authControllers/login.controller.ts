import { Request, Response } from "express";

export async function loginController(req: Request, res: Response) {
    res.status(200).json({
        message: 'login controller working',
    });
}