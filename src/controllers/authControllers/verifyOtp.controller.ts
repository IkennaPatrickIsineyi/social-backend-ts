import { Response } from "express";
import { VerifyOTPRequestType } from "../../../types/http/request/auth/OTP.type";
import { validateOtp } from "../../services/otp.service";
import { OTP } from "../../models/auth/OTP.model";
import { OTPType } from "../../../types/model/auth/OTP.type";

export async function verifyOtpController(req: VerifyOTPRequestType, res: Response) {
    const { email, token } = req.body;

    //IF otp is not valid, return false
    const isValid = validateOtp(token, email);

    if (!isValid) {
        console.log('token is invalid', email);
        return res.status(200).json({
            message: 'invalid token',
            data: false
        });
    }

    //Get the record with the email address and otp
    const otpRecord = await OTP.findOne<OTPType>({ email, otp: token });

    if (otpRecord) {
        //Add the token to the session
        //It will be retrieved when the user tries to change their password
        req.session.user = {
            ...(req.session.user || {}),
            token,
            email
        }
    }

    res.status(200).json({
        message: otpRecord ? 'Valid otp' : 'invalid otp',
        data: !!otpRecord
    });
}