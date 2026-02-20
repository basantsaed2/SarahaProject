import dotenv from "dotenv"
import path from "path"

dotenv.config({path : path.resolve('./config/.env') })

const mongo_url = process.env.MONGO_URL;
const port = process.env.PORT;
const mood = process.env.MOOD;

export const env = { mongo_url , port , mood }