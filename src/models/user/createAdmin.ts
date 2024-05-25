import { configDotenv } from "dotenv";
import { User } from "./User.model";
import bcrypt from 'bcrypt';

configDotenv()

export const createAdmin = async () => {
    const adminEmail = process.env.ADMIN_EMAIL || ''
    const adminPassword = process.env.ADMIN_PASSWORD || '';

    //Create admin acceount if it doesnt exist
    User.find({ role: 'Admin' }).then(data => {
        if (!data.length) {
            bcrypt.hash(adminPassword, Number(process.env.SALT),
                (err, hash) => {
                    if (err) {
                        console.log('hash err', err)
                    }
                    else {
                        const admin = new User({
                            email: adminEmail,
                            password: hash,
                            role: 'admin',
                            fullName: 'Admin Admin',
                            profilePicture: 'default.png',
                        })

                        admin.save();
                    }

                })
        }
    })
}