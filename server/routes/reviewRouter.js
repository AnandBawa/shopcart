import { Router } from "express";
import { isLoggedIn, isAuthReview } from "../middleware/authMiddleware.js";
import {
  validateReviewId,
  validateReviewInput,
} from "../middleware/validationMiddleware.js";
import {
  createReview,
  deleteReview,
  editReview,
} from "../controllers/reviewController.js";

const reviewRouter = Router({ mergeParams: true });

reviewRouter.route("/").post(isLoggedIn, validateReviewInput, createReview);

reviewRouter
  .route("/:reviewId")
  .patch(isLoggedIn, validateReviewId, isAuthReview, editReview)
  .delete(isLoggedIn, validateReviewId, isAuthReview, deleteReview);

export default reviewRouter;
