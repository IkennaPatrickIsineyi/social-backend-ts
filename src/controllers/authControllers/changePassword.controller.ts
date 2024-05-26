import { Response } from "express";
import { hashPassword } from "../../services/password.service";
import { ChangePasswordRequestType } from "../../../types/http/request/auth/changePassword.type";
import { User } from "../../models/user/User.model";

export async function changePasswordController(req: ChangePasswordRequestType, res: Response) {
    const { password } = req.body;

    if (!password) {
        console.log('password is required');
        return res.status(401).json({
            message: 'password is required',
            data: false
        });
    }

    //Get the user session record
    const { email, token } = req.session.user || {};

    if (!token) {
        console.log('no token found. User skipped the OTP verification stage or is using a different device')
        return res.status(403).json({
            message: 'Authentication failed. Please start from the OTP page',
            data: false
        });
    }

    //Hash the password
    const hashedPassword = await hashPassword(password);

    //Update the password
    await User.updateOne({ email }, { $set: { password: hashedPassword } });

    res.status(200).json({
        message: 'Password changed',
        data: true
    });
}