import { mongoose } from "../../../src/services/db.service";

export interface OTPType {
    email: string,
    otp: string,
    createdAt?: string,
}

export interface OTPModelType extends OTPType, mongoose.Document { }