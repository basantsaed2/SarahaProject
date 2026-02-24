import jwt from "jsonwebtoken";
import { env } from "../../../config/index.js";

export const generateToken = async (user) => {
    let signature = undefined;
    let refreshSignature = undefined;
    let audience = undefined;
    switch (user.role) {
        case "0":
            signature = env.AdminSignature;
            refreshSignature = env.AdminRefreshSignature;
            audience = "Admin";
            break;
        default:
            signature = env.UserSignature;
            refreshSignature = env.UserRefreshSignature;
            audience = "User";
    }

    const accessToken = await jwt.sign({ id: user._id }, signature, {
        expiresIn: env.JWT_EXPIRES_IN,
        audience
    });

    const refreshToken = await jwt.sign({ id: user._id }, refreshSignature, {
        expiresIn: env.JWT_EXPIRES_IN_REFRESH,
        audience
    });

    return { accessToken, refreshToken };
}

export const decodeToken = async (token) => {
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
    return decodedToken;
}

export const decodeRefreshToken = async (token) => {
    let decoded = await jwt.decode(token);
    let refreshSignature = undefined

    switch (decoded.aud) {
        case "Admin":
            refreshSignature = env.AdminRefreshSignature;
            break;
        default:
            refreshSignature = env.UserRefreshSignature;
    }

    const decodedToken = await jwt.verify(token, refreshSignature);
    return decodedToken;
}
