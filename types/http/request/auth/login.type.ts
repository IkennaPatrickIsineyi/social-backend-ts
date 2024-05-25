import { TypedRequestBody } from "../../../express.type"

interface PayloadType {
    email: string,
    password: string,
}

export type LoginRequestType = TypedRequestBody<PayloadType>