import { mongoose } from "../../../src/services/db.service";

export interface UserType {
    email: string,
    password: string,
    role?: 'admin' | 'user',
    fullName: string,
    profilePicture?: string,
}

export interface UserModelType extends UserType, mongoose.Document { }