import mongoose, { Schema, model } from "mongoose";
import { createAdmin } from './createAdmin'

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: false, default: 'Admin' },
    fullName: { type: String, required: false },
    profilePicture: { type: String, required: false },
}, { timestamps: true });

const User = mongoose.models.Users || model('Users', userSchema);

createAdmin();

export { User }