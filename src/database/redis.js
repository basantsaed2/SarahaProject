import { createClient } from "redis"
import { env } from "../../config/env.service.js";

export const client = createClient({
    url: env.REDIS_URL
});

client.on("error", function (err) {
    throw err;
});

export const connectRedis = async () => {
    try {
        await client.connect();
        console.log("Redis connected");
    } catch (error) {
        console.log(error);
    }
}