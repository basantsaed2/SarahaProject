import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve('./config/.env') })

const mongo_url = process.env.MONGO_URL;
const port = process.env.PORT;
const mood = process.env.MOOD;
const base_url = process.env.BASE_URL;
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const JWT_EXPIRES_IN_REFRESH = process.env.JWT_EXPIRES_IN_REFRESH;
const AdminSignature = process.env.JWT_ADMIN_SIGNATURE;
const UserSignature = process.env.JWT_USER_SIGNATURE;
const AdminRefreshSignature = process.env.JWT_ADMIN_REFRESH_SIGNATURE;
const UserRefreshSignature = process.env.JWT_USER_REFRESH_SIGNATURE;
const WEB_CLIENT_ID = process.env.WEB_CLIENT_ID;
const REDIS_URL = process.env.REDIS_URL;


export const env = {
    mongo_url,
    port,
    mood,
    base_url,
    SALT_ROUNDS,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    JWT_EXPIRES_IN_REFRESH,
    AdminSignature,
    UserSignature,
    AdminRefreshSignature,
    UserRefreshSignature,
    WEB_CLIENT_ID,
    REDIS_URL
}