import Joi from "joi";

const reviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  review: Joi.string().required(),
});

export default reviewSchema;
