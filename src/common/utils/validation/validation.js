import { BadRequestException } from "../response/error.responce.js";

export const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            throw BadRequestException({ message: "validation error", extra: error });
        }
        next();
    }
}