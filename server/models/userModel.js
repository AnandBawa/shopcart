import mongoose from "mongoose";
import { ROLES } from "../utils/constants.js";

const UserModel = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
    githubId: String,
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
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserModel);
