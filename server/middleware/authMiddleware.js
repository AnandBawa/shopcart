import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";

// Check if User is logged in
export const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  next();
};

// Check if User is an Admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new UnauthorizedError("Unauthorized to access this route");
  }
  next();
};

// Check if User is authorized to create/edit/delete review
export const isAuthReview = async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);
  if (!(req.user.role === "admin") && !review.author.equals(req.user._id)) {
    throw new UnauthorizedError(
      "You are not authorized to perform this action"
    );
  }
  next();
};
