import { Request, Response } from "express";
import { RegisterRequestType } from "../../../types/http/request/auth/register.type";
import { User } from "../../models/user/User.model";
//import { UserType } from "../../../types/model/user/user.type";
import { hashPassword } from "../../services/password.service";

export async function registerController(
    req: RegisterRequestType,
    res: Response
) {
    //If user is logged in, reject request
    if (req.session.user?.isLoggedIn) {
        return res.status(200).json({
            message: 'You are already logged in.',
            data: false
        });
    }

    //Get the body
    const { fullName, email, password, profilePicture } = req.body;

    //Check if the email exists in the database
    const emailExists = await User.findOne({ email }, { email: 1 })

    //If it exists, reject the request.
    if (emailExists) {
        console.log('email already exists');
        res.status(200).json({
            message: 'Email has been taken. Please choose another email',
            data: false
        });
    }
    else {
        //Hash the password
        const hashedPassword = await hashPassword(password);

        //Create a record for the user in the database
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            profilePicture
        });

        await newUser.save()

        res.status(200).json({
            message: 'user registered',
            data: newUser?._id
        });
    }
}