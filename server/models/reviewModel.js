import mongoose from "mongoose";

const ReviewModel = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    review: String,
    rating: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewModel);
