import { TypedRequestBody } from "../../../express.type"

interface PayloadType {
    fullName: string,
    email: string,
    profilePicture?: string,
    password: string,
}

export type RegisterRequestType = TypedRequestBody<PayloadType>