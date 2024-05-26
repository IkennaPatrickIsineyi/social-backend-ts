import { OTPModelType } from "../../../types/model/auth/OTP.type";
import { mongoose } from "../../services/db.service";


const OTPSchema: mongoose.Schema = new mongoose.Schema<OTPModelType>({
    email: { type: String, required: true },
    otp: { type: String, required: true },
}, { timestamps: true });

const OTP = mongoose.models.OTPs || mongoose.model<OTPModelType>('OTPs', OTPSchema);

export { OTP }