import { StatusCodes } from "http-status-codes";
import Review from "../models/reviewModel.js";
import Product from "../models/productModel.js";

export const createReview = async (req, res) => {
  const { id } = req.params;
  req.body.author = req.user._id;
  const review = await Review.create(req.body);
  await Product.findByIdAndUpdate(id, { $push: { reviews: review._id } });
  res.status(StatusCodes.CREATED).json({ review });
};

export const editReview = async (req, res) => {
  const editedReview = await Review.findByIdAndUpdate(
    req.params.reviewId,
    req.body,
    {
      new: true,
    }
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: "Review modified", review: editedReview });
};

export const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.status(StatusCodes.OK).json({ msg: "Review deleted" });
};
