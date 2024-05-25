import { Request, Response } from "express";

export async function verifyOtpController(req: Request, res: Response) {
    res.status(200).json({
        message: 'verify otp controller working',
    });
}