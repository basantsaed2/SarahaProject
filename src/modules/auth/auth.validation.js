import joi from "joi";

export const signupSchema = joi.object({
    userName: joi.string().min(3).max(30).required().messages({
        "string.base": "User name should be a string",
        "string.empty": "User name cannot be empty",
        "string.min": "User name should have a minimum length of 3",
        "string.max": "User name should have a maximum length of 30",
        "any.required": "User name is required"
    }),
    email: joi.string().email().required(),
    password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({
        "string.pattern.base": "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)"
    }),
    phone: joi.string().required(),
    age: joi.number().integer().min(18).max(100).required(),
    role: joi.string().optional().default("User"),
    users: joi.array().items(joi.string()).min(2).max(10).optional()
});

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(30).alphanum().required(),
});
