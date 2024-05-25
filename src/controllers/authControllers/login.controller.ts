import { Request, Response } from "express";
import { User } from "../../models/user/User.model";
import bcrypt from 'bcrypt';
import { UserType } from "../../../types/model/user/user.type";
import { LoginRequestType } from "../../../types/http/request/auth/login.type";

export async function loginController(req: LoginRequestType, res: Response) {
    //IF user is logged in, reject request positively
    if (req.session.user?.isLoggedIn) return res.status(200).json({
        message: 'logged in',
        data: true
    });

    //Get the email and password

    const payload = req.body;
    if (!payload) {
        console.log('payload is invalid', payload);
        return res.status(401).json({
            message: 'invalid payload',
            data: false
        });
    }

    const { email, password } = payload;

    //Get the password of the email
    const user = await User.findOne<UserType>({ email });
    const hash = user?.password;

    //If the result is empty, then the email does not exist, reject the request
    if (!hash) {
        console.log('email address does not belong to a user', hash, payload);
        return res.status(401).json({
            message: 'invalid credentials',
            data: false
        });
    }

    //Check if the returned password matches the hash of the password provided
    const matched = await bcrypt.compare(password, hash);

    //If the passwords do not match, reject the request
    if (!matched) {
        console.log('password mismatch', matched);
        return res.status(401).json({
            message: 'invalid credentials',
            data: false
        });
    }
    else {
        //log the user in via session
        req.session.user = {
            isLoggedIn: true,
            fullname: user.fullName
        }

        res.status(200).json({
            message: 'logged in',
            data: true
        });
    }
}