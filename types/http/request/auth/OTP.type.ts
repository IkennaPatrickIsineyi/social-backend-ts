import { TypedRequestBody } from "../../../express.type"

interface OTPPayloadType {
    email: string
}

interface VerifyOTPPayloadType {
    email: string,
    token: string
}

export type OTPRequestType = TypedRequestBody<OTPPayloadType>

export type VerifyOTPRequestType = TypedRequestBody<VerifyOTPPayloadType>