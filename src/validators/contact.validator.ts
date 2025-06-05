import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().optional().allow(''),
  address: Joi.string().optional().allow(''),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
});
