import { NextFunction, Request, Response } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.session.user) return next();
    return next(); //res.status(403).send('login is required') //Send the user to login page
}