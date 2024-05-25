import { NextFunction, Request, Response } from "express";

export function route404Middleware(req: Request, res: Response, next: NextFunction) {
    return res.status(404).send('unknown route')
}