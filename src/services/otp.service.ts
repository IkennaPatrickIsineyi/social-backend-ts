import { configDotenv } from "dotenv";
import * as OTPAuth from "otpauth";


type Props = {
    length?: number;
    type: 'string' | 'number',
    secret: string
}

configDotenv()

// Create a new TOTP object.
export const otp = (secret: string) => {
    return new OTPAuth.TOTP({
        // Algorithm used for the HMAC function.
        algorithm: "SHA1",
        // Length of the generated tokens.
        digits: 6,
        // Interval of time for which a token is valid, in seconds.
        period: 180,
        // The secret should be unique to the token request.
        // Eg. the email or phone number should be used to do that 
        secret: OTPAuth.Secret.fromUTF8(secret + (process.env.OTP_SECRET || ''))/* :secret process.env.OTP_SECRET */, // or 'OTPAuth.Secret.fromBase32("NB2W45DFOIZA")'
    });
}

export const generateOtp = ({
    length,
    type,
    secret
}: Props) => {
    const code = otp(secret).generate();

    console.log('the otp is', code); //Remove this after testing

    return code;
}


export const validateOtp = (token: string, secret: string) => {
    const delta = otp(secret).validate({ token, window: 1 });
    console.log('delta', delta);

    return delta === 0
}