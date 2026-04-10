import { UnauthorizedException } from "../utils/response/error.responce.js";
import { decodeToken } from "../security/security.js";
import { createRevokeKey, get } from "../../database/redis.service.js";

export const auth = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return UnauthorizedException({ message: "token is not exist" });
    }

    // Handle Bearer token format
    let token;
    if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
    } else {
        token = authHeader;
    }

    const decodedToken = await decodeToken(token);

    const isRevoked = await get(createRevokeKey({ id: decodedToken.id, token }));
    if (isRevoked !== null) {
        return UnauthorizedException({ message: "token is revoked" });
    }

    req.user = decodedToken;
    req.token = token;
    next();
}