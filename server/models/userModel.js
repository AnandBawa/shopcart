import mongoose from "mongoose";
import { ROLES } from "../utils/constants.js";

const UserModel = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
    address: {
      type: [
        {
          name: String,
          add1: String,
          add2: String,
          pin: Number,
          location: String,
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