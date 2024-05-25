import { Request, Response } from "express";

export async function checkAuthController(req: Request, res: Response) {
    res.status(200).json({
        message: 'check auth controller working',
    });
}