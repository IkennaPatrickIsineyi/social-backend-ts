import { Request, Response } from "express";

export async function otpController(req: Request, res: Response) {
    res.status(200).json({
        message: 'otp send controller working',
    });
}