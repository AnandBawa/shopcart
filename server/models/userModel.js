import mongoose from "mongoose";
import { ROLES } from "../utils/constants.js";

const UserModel = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
    cart: { type: mongoose.Mixed, default: undefined },
    address: {
      type: [
        {
          nickname: String,
          add1: String,
          add2: String,
          pin: String,
          location: String,
        },
      ],
      default: undefined,
    },
    payments: {
      type: [
        {
          nickname: String,
          name: String,
          number: String,
          expiryMonth: Number,
          expiryYear: Number,
          cvc: Number,
        },
      ],
      default: undefined,
    },
    role: {
      type: String,
      enum: [...ROLES],
      default: "user",
    },
    image: {
      type: {
        url: String,
        publicId: String,
      },
      default: undefined,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserModel);
