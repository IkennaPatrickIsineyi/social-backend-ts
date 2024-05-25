import { Request, Response } from "express";

export async function changePasswordController(req: Request, res: Response) {
    res.status(200).json({
        message: 'change password controller working',
    });
}