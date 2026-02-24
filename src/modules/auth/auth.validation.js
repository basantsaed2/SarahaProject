import joi from "joi";

export const signupSchema = joi.object({
    userName: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(30).alphanum().required(),
    phone: joi.string().required(),
    role: joi.string().optional().default("User")
});

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(30).alphanum().required(),
});
