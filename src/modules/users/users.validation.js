import Joi from "joi";

export const updateUserSchema = Joi.object({
  userName: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(/^01[0-2,5]\d{8}$/).optional(),
  role: Joi.string().valid("User", "Admin").optional(),
  shareProfileName: Joi.string().min(3).max(50).optional(),
  // image is handled by multer, not in body validation
});