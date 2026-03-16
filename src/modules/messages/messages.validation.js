import Joi from "joi";
export const sendMessageSchema = Joi.object({
  message: Joi.string().min(1).max(500).required(),
  date: Joi.date().required(),
  image: Joi.string().uri().optional(),
});
