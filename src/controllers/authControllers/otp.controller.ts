import { Response } from "express";
import { generateOtp } from "../../services/otp.service";
import { OTP } from "../../models/auth/OTP.model";
import { OTPRequestType } from "../../../types/http/request/auth/OTP.type";
import { OTPType } from "../../../types/model/auth/OTP.type";

export async function otpController(req: OTPRequestType, res: Response) {
    const email = req.body?.email;

    //Generate the OTP
    const otp = generateOtp({
        type: 'string',
        secret: email
    });

    //Save the otp to the OTP collection
    const newOtp = new OTP<OTPType>({
        email,
        otp
    });

    await newOtp.save()

    res.status(200).json({
        message: 'OTP sent',
        data: true
    });
}