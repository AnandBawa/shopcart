import { BadRequestError } from "../errors/customErrors.js";
import productSchema from "../schemas/productSchema.js";

export const validateProductInput = (req, res, next) => {
  const { error } = productSchema.validate(req.body, { abortEarly: false });
  if (error) {
    let msg = error.details.map((el) => el.message).join(", ");
    // msg = msg.slice(0, -2);
    console.log(msg);
    throw new BadRequestError("error");
  }
  next();
};
