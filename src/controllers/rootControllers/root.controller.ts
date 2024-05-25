import { Request, Response } from "express";
import { User } from "../../models/user/User.model";

export async function rootController(req: Request, res: Response) {
    const user = await User.find({});

    res.status(200).json({
        message: 'root controller working',
    });
}