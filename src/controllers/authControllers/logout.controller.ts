import { Request, Response } from "express";

export async function logoutController(req: Request, res: Response) {
    const user = req.session.user;

    if (!user) return res.status(200).json({
        message: 'logged out',
        data: true
    });

    req.session.regenerate(function (err) {
        req.session.save(function (err) {
            console.log('logged out')
            return res.status(200).json({
                message: 'logged out',
                data: true
            });
        })
    })
}