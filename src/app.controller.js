import express from "express"
import { env } from "../config/index.js";
import { databaseConnection } from "./database/index.js";
import { globalErrorHandler } from "./common/utils/response/error.responce.js";
import authRouter from "./modules/auth/auth.controller.js"
import messageRouter from "./modules/messages/messages.controller.js"
import cors from "cors"
import userRouter from "./modules/users/users.controller.js";
import { connectRedis, client } from "./database/redis.js";
import { set, get } from "./database/redis.service.js";
export const bootstrap = async () => {

    const app = express();
    app.use(express.json());

    app.use("/uploads", express.static("uploads"))
    app.use(cors());

    await databaseConnection();
    await connectRedis();

    // await set({
    //     key: "user",
    //     value: "bassant",
    //     ex: 60
    // })
    // console.log(await get("user"));

    app.use("/auth", authRouter)
    app.use("/message", messageRouter)
    app.use("/user", userRouter)

    app.use("{*dummy}", (req, res) => {
        res.status(404).json('Invalid route')
    })

    app.use(globalErrorHandler)


    app.listen(env.port, () => {
        console.log(`server is running on port ${env.port}`)
    })

}