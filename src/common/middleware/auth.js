import { UnauthorizedException } from "../utils/response/error.responce.js";
import jwt from "jsonwebtoken";
import { env } from "../../../config/index.js";
import fs from "fs";

// const public_key = fs.readFileSync("./public.key", "utf-8");

export const auth = async (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return UnauthorizedException({ message: "token is not exist" });
    }

    let decoded = await jwt.decode(token);

    let signature = undefined
    switch (decoded.aud) {
        case "Admin":
            signature = env.AdminSignature;
            break;
        default:
            signature = env.UserSignature;
    }

    const decodedToken = await jwt.verify(token, signature);
    // const decodedToken = await jwt.verify(token, public_key, { algorithms: ["RS256"] });


    req.user = decodedToken;

    next();
}