import mongoose from "mongoose";
import { ProductModel } from "./productModel.js";

console.log();

const OrderModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: mongoose.Mixed,
    payment: mongoose.Mixed,
    cart: mongoose.Mixed,
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderModel);
