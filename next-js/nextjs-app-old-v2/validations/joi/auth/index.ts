import joi from 'joi';

export const loginSchemaJoi = joi.object({
  email: joi.string().email(),
  password: joi.string().min(4),
});
