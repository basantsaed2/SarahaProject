import express from "express"
import { env } from "../config/index.js";
import { databaseConnection } from "./database/index.js";
import { globalErrorHandler } from "./common/utils/response/error.responce.js";
import authRouter from "./modules/auth/auth.controller.js"
import messageRouter from "./modules/messages/messages.controller.js"
import cors from "cors"
export const bootstrap = () => {

    const app = express();
    app.use(express.json());

    app.use("/uploads", express.static("uploads"))
    app.use(cors());
    databaseConnection();

    app.use("/auth", authRouter)
    app.use("/message", messageRouter)

    app.use("{*dummy}", (req, res) => {
        res.status(404).json('Invalid route')
    })

    app.use(globalErrorHandler)


    app.listen(env.port, () => {
        console.log(`server is running on port ${env.port}`)
    })

}