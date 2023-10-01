import mongoose from "mongoose";

const OrderModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    total: Number,
    discount: Number,
    tax: Number,
    products: {
      type: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          price: Number,
          quantity: Number,
        },
      ],
      default: undefined,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderModel);
