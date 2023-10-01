import Joi from "joi";

export const userSchema = Joi.object({
  firstName: Joi.string().alphanum().max(20).required(),
  lastName: Joi.string().alphanum().max(15).required(),
  password: Joi.string()
    .regex(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#-_])[a-zA-Z0-9!@#-_]{8,20}$/
    )
    .required()
    .messages({
      "string.pattern.base": `Password should be between 8 to 20 characters. It can contain letters, numbers or any of the five special characters [!,@,#,-,_]. It should include at-least one uppercase alphabet, one lowercase alphabet, one digit and one special character`,
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
    .required(),
  phone: Joi.string()
    .regex(/^(?=.*[0-9])[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number should be 10 digits",
    }),
});

export const addressSchema = Joi.object({
  name: Joi.string().required(),
  add1: Joi.string().required(),
  add2: Joi.string().required(),
  pin: Joi.string()
    .regex(/^(?=.*[0-9])[0-9]{4,8}$/)
    .required(),
  location: Joi.string().required(),
});
