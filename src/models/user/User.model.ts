import { createAdmin } from './createAdmin'
import { UserModelType, UserType } from "../../../types/model/user/user.type";
import { mongoose } from "../../services/db.service";


const userSchema: mongoose.Schema = new mongoose.Schema<UserModelType>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: false, default: 'Admin' },
    fullName: { type: String, required: false },
    profilePicture: { type: String, required: false },
}, { timestamps: true });

const User = mongoose.models.Users || mongoose.model<UserModelType>('Users', userSchema);

createAdmin();

export { User }