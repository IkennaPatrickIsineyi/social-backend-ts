import { TypedRequestBody } from "../../../express.type"

interface PayloadType {
    password: string,
}

export type ChangePasswordRequestType = TypedRequestBody<PayloadType>