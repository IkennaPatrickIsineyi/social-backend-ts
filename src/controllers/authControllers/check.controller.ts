import { Request, Response } from "express";

export async function checkAuthController(req: Request, res: Response) {
    const user = req.session.user;

    res.status(200).json({
        message: user?.isLoggedIn ? 'logged in' : 'not logged in',
        data: user
    });
}