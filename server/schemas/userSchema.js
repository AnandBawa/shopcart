import Joi from "joi";

export const userSchema = Joi.object({
  firstName: Joi.string().alphanum().max(20).required(),
  lastName: Joi.string().alphanum().max(15).required(),
  password: Joi.string()
    .regex(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
    )
    .required()
    .messages({
      "string.pattern.base": `Password should be between 8 to 20 characters. It can contain letters, numbers or these special characters: !, @, #, $, %, ^, &, or *. It should include at-least one uppercase alphabet, one lowercase alphabet, one digit and one special character`,
      "string.empty": `Password cannot be empty`,
      "any.required": `Password is required`,
    }),
  repeatPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "The two passwords do not match",
    "any.required": "Please re-enter the password",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .messages({
      "string.email": "Please enter a valid email",
    }),
  phone: Joi.string()
    .regex(/^(?=.*[0-9])[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number should be 10 digits",
    }),
  newPassword: Joi.string()
    .regex(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
    )
    .messages({
      "string.pattern.base": `Password should be between 8 to 20 characters. It can contain letters, numbers or these special characters: !, @, #, $, %, ^, &, or *. It should include at-least one uppercase alphabet, one lowercase alphabet, one digit and one special character`,
      "string.empty": `Password cannot be empty`,
      "any.required": `Password is required`,
    }),
});

export const addressSchema = Joi.object({
  nickname: Joi.string().required(),
  add1: Joi.string().required(),
  add2: Joi.string().required(),
  pin: Joi.string()
    .regex(/^(?=.*[0-9])[0-9-]{4,10}$/)
    .required()
    .messages({
      "string.pattern.base": "PIN code should be between 4-10 digits",
    }),
  location: Joi.string().required(),
});

const d = new Date();
const year = d.getFullYear();
const years = Array.from({ length: 10 }, (_, i) => year + i);

export const paymentSchema = Joi.object({
  nickname: Joi.string().required(),
  name: Joi.string().required(),
  number: Joi.string()
    .regex(/^(?=.*[0-9])[0-9]{16}$/)
    .required()
    .messages({
      "string.pattern.base": "Card number should be 16 digits",
    }),
  expiryMonth: Joi.number().valid(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12),
  expiryYear: Joi.number().valid(...years),
  cvc: Joi.number().min(100).max(999),
});
