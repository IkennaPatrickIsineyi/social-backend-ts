import { Request, Response } from "express";

export async function registerController(req: Request, res: Response) {
    res.status(200).json({
        message: 'registration controller working',
    });
}