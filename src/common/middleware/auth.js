import { UnauthorizedException } from "../utils/response/error.responce.js";
import { decodeToken } from "../security/security.js";

export const auth = async (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return UnauthorizedException({ message: "token is not exist" });
    }

    const decodedToken = await decodeToken(token);

    req.user = decodedToken;

    next();
}