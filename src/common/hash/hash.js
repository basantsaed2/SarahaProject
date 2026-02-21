import bcrypt from 'bcrypt'
import { env } from "../../../config/index.js";

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(Number(env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const comparePassword = async (password, hashPassword) => {
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch;
}