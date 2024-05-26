import bcrypt from 'bcrypt';
import { configDotenv } from 'dotenv';

configDotenv()

export const hashPassword = async (password: string) => {
    const rounds = 10;

    const hash = await bcrypt.hash(password, rounds);

    return hash
}