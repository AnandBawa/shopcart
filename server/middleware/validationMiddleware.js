import mongoose from "mongoose";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import Product from "../models/productModel.js";
import productSchema from "../schemas/productSchema.js";
import User from "../models/userModel.js";
import {
  userSchema,
  addressSchema,
  paymentSchema,
} from "../schemas/userSchema.js";
import Review from "../models/reviewModel.js";
import reviewSchema from "../schemas/reviewSchema.js";
import { comparePassword } from "../utils/passwordUtils.js";

// Function to map error messages
const errorMessages = (errors) => {
  let msg = errors
    .map((error) => {
      let message = error.message.replaceAll(`"`, ``).replaceAll(`_`, ` `);
      return message.charAt(0).toUpperCase() + message.slice(1);
    })
    .join(". ");
  return msg;
};

// Validate ProductID
export const validateProductId = async (req, res, next) => {
  const { id } = req.params;
  const isValidId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidId) {
    throw new BadRequestError("Invalid MongoDB ID");
  }
  const product = await Product.findById(id);
  if (!product) {
    throw new NotFoundError(`No product found with id ${id}`);
  }
  next();
};

// Validate new Product input
export const validateProductInput = async (req, res, next) => {
  const { error } = productSchema.validate(req.body, { abortEarly: false });
  if (error) {
    let msg = errorMessages(error.details);
    throw new BadRequestError(msg);
  }
  next();
};

// Validate new User Registration input
export const validateRegisterInput = async (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    let msg = errorMessages(error.details);
    throw new BadRequestError(msg);
  }
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });
  if (user) {
    throw new BadRequestError("Email/phone already in use");
  }
  next();
};

// Validate Review ID
export const validateReviewId = async (req, res, next) => {
  const { reviewId } = req.params;
  const isValidId = mongoose.Types.ObjectId.isValid(reviewId);
  if (!isValidId) {
    throw new BadRequestError("Invalid MongoDB ID");
  }
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new NotFoundError(`No product found with id ${reviewId}`);
  }
  next();
};

// Validate new Review input
export const validateReviewInput = async (req, res, next) => {
  const { error } = reviewSchema.validate(req.body, { abortEarly: false });
  if (error) {
    let msg = errorMessages(error.details);
    throw new BadRequestError(msg);
  }
  next();
};

// Validate User Profile changes
export const validateUpdateUserInput = async (req, res, next) => {
  const isMatch = await comparePassword(req.user.password, req.body.password);
  if (!isMatch) {
    throw new UnauthenticatedError("Incorrect current password");
  }
  const userByEmail = await User.findOne({ email: req.body.email });
  if (userByEmail && userByEmail._id.equals(req.user._id) === false) {
    throw new BadRequestError("Email already in use");
  }
  const userByPhone = await User.findOne({ phone: req.body.phone });
  if (userByPhone && userByPhone._id.equals(req.user._id) === false) {
    throw new BadRequestError("Phone already in use");
  }
  if (req.body.newPassword === "" || req.body.repeatNewPassword === "") {
    delete req.body.newPassword;
    delete req.body.repeatNewPassword;
  }
  const data = { ...req.body };
  delete data.password;
  delete data.repeatNewPassword;

  let errorMessage = [];
  for (const [key, value] of Object.entries(data)) {
    const subSchema = userSchema.extract(key);
    const { error } = subSchema.validate(value);
    if (error) {
      // console.log(error.details[0]);
      const err = error.details[0];
      err.message = `${key} ${error.message}`;
      errorMessage.push(err);
    }
  }
  if (errorMessage.length !== 0) {
    throw new BadRequestError(errorMessages(errorMessage));
  }
  next();
};

// Validate Address Input
export const validateAddressInput = async (req, res, next) => {
  const { error } = addressSchema.validate(req.body, { abortEarly: false });
  if (error) {
    let msg = errorMessages(error.details);
    throw new BadRequestError(msg);
  }
  next();
};

export const validatePaymentInput = async (req, res, next) => {
  const { error } = paymentSchema.validate(req.body, { abortEarly: false });
  if (error) {
    let msg = errorMessages(error.details);
    throw new BadRequestError(msg);
  }
  next();
};
